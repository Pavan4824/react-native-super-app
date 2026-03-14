import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type BackHandlerOptions = {
  /**
   * Called when back is requested (header back, gesture, or hardware back).
   * Call completeBack() to actually go back, or do nothing to stay.
   */
  onBackRequest?: (ctx: {completeBack: () => void}) => void;
  /**
   * When true, the Android hardware back button is consumed and does not navigate.
   */
  disableHardwareBack?: boolean;
};

/**
 * HOC that wraps a screen and adds shared back handling (beforeRemove) for both
 * the custom header back button and the physical Android back button.
 * Use as: component={withBackHandler(PlaceholderScreen)} or
 * component={withBackHandler(PlaceholderScreen, { onBackRequest: ({ completeBack }) => { ... }, disableHardwareBack: true })}
 */
export function withBackHandler<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  backHandlerOptions?: BackHandlerOptions,
) {
  const opts: BackHandlerOptions = {...backHandlerOptions};

  function ScreenWithBackHandler(
    props: P &
      NativeStackScreenProps<Record<string, object | undefined>, string>,
  ) {
    const {navigation} = props;

    useEffect(() => {
      if (!opts.onBackRequest) {
        return undefined;
      }

      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        opts.onBackRequest!({
          completeBack: () => navigation.dispatch(e.data.action),
        });
      });

      return unsubscribe;
    }, [navigation]);

    useFocusEffect(
      React.useCallback(() => {
        if (!opts.disableHardwareBack) {
          return undefined;
        }
        const sub = BackHandler.addEventListener(
          'hardwareBackPress',
          () => true,
        );
        return () => sub.remove();
      }, [opts.disableHardwareBack]),
    );

    return <WrappedComponent {...(props as P)} />;
  }

  ScreenWithBackHandler.displayName = `WithBackHandler(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Screen'
  })`;

  return ScreenWithBackHandler;
}
