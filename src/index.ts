import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex05.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  // LP: define variables `wallet`, `_currentAddress` and `_transferAmount`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wallet: any;
  private _currentAddress: string | null = null;
  private _transferAmount = '0x2C68AF0BB140000';
  // LP end

  async activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Connect',
            img: EXAMPLE_IMG,
            // LP: 1. Open wallet
            exec: async (_, me) => {
              me.state = 'PENDING';
              if (!this.wallet) {
                this.wallet = await Core.wallet({ type: 'ethereum', network: 'goerli' });
                const isWalletConnected = await this.wallet.isConnected();
                if (!isWalletConnected) await this.wallet.connect();
              }
              this.wallet.sendAndListen('eth_accounts', [], {
                result: (_, { data }) => {
                  this._currentAddress = data[0];
                  me.state = 'CONNECTED';
                },
              });
            },
            // LP end
          },
          // LP: 2. Add states CONNECTED, PENDING, REGECTED, `MINING`, COMPLETED and UNAVAILABLE.
          CONNECTED: {
            label: `Send ${Number(BigInt(this._transferAmount) / BigInt(1_000_000_000_000)) / 1_000_000} ETH`,
            img: EXAMPLE_IMG,
            loading: false,
            exec: async (_, me) => {
              // LP: 3. Send the necessary data to wallet and listen for the answer.
              this.wallet.sendAndListen(
                'eth_sendTransaction',
                [
                  {
                    from: this._currentAddress,
                    to: this._currentAddress,
                    value: this._transferAmount,
                  },
                ],
                {
                  // LP: 4. Show the state of the transaction
                  pending: () => (me.state = 'PENDING'),
                  rejected: () => (me.state = 'REGECTED'),
                  result: () => (me.state = 'MINING'),
                  mined: (_, { hash }) =>
                    (me.state = hash === 0 || hash === 0x0 ? 'UNAVAILABLE' : 'COMPLETED'),
                },
              );
            },
          },
          PENDING: {
            label: 'Pending',
            loading: true,
          },
          REGECTED: {
            label: 'Rejected',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => (me.state = 'CONNECTED'),
          },
          MINING: {
            label: 'Mining',
            loading: true,
          },
          COMPLETED: {
            label: 'Completed',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => (me.state = 'CONNECTED'),
          },
          UNAVAILABLE: {
            label: 'Not available',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => (me.state = 'CONNECTED'),
          },
          // LP end
        }),
    });
  }
}
