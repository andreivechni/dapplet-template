# Example 7: Virtual adapter (interface)

Task: change twitter adapter to **identity** adapter and check it on Twitter and Instagram.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Change twitter adapter to **identity** adapter in `/dapplet.json` with a right version:

```json
{
  ...
  "contextIds": ["identity-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "identity-adapter.dapplet-base.eth": "0.3.0"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('identity-adapter.dapplet-base.eth') public adapter: any;
```

Run the dapplet:

```bash
npm i
npm start
```

This page in the docs is [here.](https://docs.dapplets.org/docs/virtual-adapter-int)
