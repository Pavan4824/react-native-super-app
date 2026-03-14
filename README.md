# superApp

React Native 0.84 app for brushing up basics and learning. Each topic lives on its own branch so you can revise and reference them later.

## Quick start

```bash
npm install
npx react-native start    # in one terminal
npx react-native run-ios  # or run-android
```

## Branch strategy

- **`main`** – Clean starter (current app shell, no extra topics).
- **`topic/<name>`** – One branch per learning topic (e.g. `topic/navigation`, `topic/state`).

To revise a topic later: `git checkout topic/<name>` and run the app.  
To start a new topic: from `main`, run `git checkout -b topic/<name>`, then add your code.

See [BRANCHES.md](./BRANCHES.md) for a list of topic ideas and branch naming.
