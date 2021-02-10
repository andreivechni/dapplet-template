# Example 6: Viewport adapter

Task: change twitter adapter to **common** adapter and check it on Twitter and Dapplets.org

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

Change twitter adapter to **common** adapter in `/dapplet.json` with a right version:

```json
{
  ...
  
  "contextIds": ["common-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "common-adapter.dapplet-base.eth": "0.3.6"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('common-adapter.dapplet-base.eth') public adapter: any;
```

and set the right context:

```ts
BODY: () =>
  button({
    DEFAULT: {
      tooltip: 'Injected Button',
      img: EXAMPLE_IMG,
      exec: () => alert('Hello, World!'),
    },
  }),
```

Run the dapplet:

```bash
npm i
npm start
```

This page in the docs is [here.](https://docs.dapplets.org/docs/viewport-adapter)
