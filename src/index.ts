import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex05.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  // LP: define variables `wallet`, `_currentAddress` and `_transferAmount`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wallet: any;
  private _currentAddresses: string[] | null = null;
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
              if (!(this.wallet && !(this.wallet.isConnected && !(await this.wallet.isConnected())))) {

                // ** USING Core.login **
                //
                // const prevSessions = await Core.sessions();
                // const prevSession = prevSessions.find(x => x.authMethod === 'ethereum/goerli');
                // let session = prevSession
                // if (!prevSession) {
                //   try {
                //     session = await Core.login({ authMethods: ['ethereum/goerli'] })
                //   } catch (err) {
                //     console.log('Login ERROR:', err)
                //     me.state = 'REGECTED';
                //     return;
                //   }
                // }
                // this.wallet = await session.wallet();

                // ** USING Core.wallet **
                //
                try {
                  this.wallet = this.wallet ?? await Core.wallet({ type: "ethereum", network: "goerli" });
                  console.log('this.wallet', this.wallet)
                  const isWalletConnected = await this.wallet.isConnected();
                  console.log('isWalletConnected', isWalletConnected)
                  if (!isWalletConnected) await this.wallet.connect();
                } catch (err) {
                  console.log('Login ERROR:', err)
                  me.state = 'REGECTED';
                  return;
                }

                // **

              }
              this._currentAddresses = await this.wallet.request({ method: 'eth_accounts', params: [] });
              console.log('Your Ethereum address', this._currentAddresses);
              me.state = this._currentAddresses ? 'CONNECTED' : 'REGECTED';
            },
            // LP end
          },
          // LP: 2. Add states CONNECTED, PENDING, REGECTED, MINING, COMPLETED and FAILURE.
          CONNECTED: {
            label: `Send ${Number(BigInt(this._transferAmount) / BigInt(1_000_000_000_000)) / 1_000_000} ETH`,
            img: EXAMPLE_IMG,
            loading: false,
            exec: async (_, me) => {
              // LP: 3. Send the necessary data to wallet and listen for the answer.
              me.state = 'PENDING';
              try {
                const transactionHash = await this.wallet.request({
                  method: 'eth_sendTransaction',
                  params: [
                    {
                      from: this._currentAddresses[0],
                      to: this._currentAddresses[0],
                      value: this._transferAmount,
                    },
                  ],
                });
                console.log('transactionHash', transactionHash)
                me.state = 'MINING';
                try {
                  const transactionReceipt = await this.wallet.waitTransaction(transactionHash, 2);
                  console.log('transactionReceipt', transactionReceipt)
                  me.state = transactionReceipt.status === "0x1" ? 'COMPLETED' : 'FAILURE';
                } catch (err) {
                  console.log('Transaction waiting ERROR:', err)
                  me.state = 'FAILURE';
                }
              } catch (err) {
                console.log('Transaction ERROR:', err)
                me.state = 'REGECTED';
              }
            },
          },
          PENDING: {
            label: 'Pending',
            loading: true,
            exec: null,
          },
          REGECTED: {
            label: 'Rejected',
            img: EXAMPLE_IMG,
            loading: false,
            exec: async (_, me) => {
              me.state = this.wallet && !(this.wallet.isConnected && !(await this.wallet.isConnected())) ? 'CONNECTED' : 'DEFAULT';
            },
          },
          MINING: {
            label: 'Mining',
            loading: true,
            exec: null,
          },
          COMPLETED: {
            label: 'Completed',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => (me.state = 'CONNECTED'),
          },
          FAILURE: {
            label: 'Failure',
            img: EXAMPLE_IMG,
            loading: false,
            exec: (_, me) => (me.state = 'CONNECTED'),
          },
          // LP end
        }),
    });
  }
}
