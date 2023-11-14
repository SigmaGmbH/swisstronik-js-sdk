import { QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
    QueryExtensionSetup,
    IdentityExtensions
} from "./types.js";

export class SwisstronikQuerier extends QueryClient {
    constructor(tmClient: Tendermint34Client) {
        super(tmClient)
    }

    static async connect(url: string): Promise<SwisstronikQuerier> {
        const tmClient = await Tendermint34Client.connect(url);
        return new SwisstronikQuerier(tmClient);
    }

    static async fromClient(client: Tendermint34Client): Promise<SwisstronikQuerier> {
        return new SwisstronikQuerier(client);
    }

    static async connectWithExtension(url: string, extension: QueryExtensionSetup<IdentityExtensions>): Promise<SwisstronikQuerier & IdentityExtensions> {
        const tmClient = await Tendermint34Client.connect(url);
        return SwisstronikQuerier.withExtensions(tmClient, extension);
    }

    static async connectWithExtensions(url: string, ...extensions: QueryExtensionSetup<IdentityExtensions>[]): Promise<SwisstronikQuerier & IdentityExtensions> {
        if (extensions.length === 1) {
            return SwisstronikQuerier.connectWithExtension(url, extensions[0]);
        }

        const tmClient = await Tendermint34Client.connect(url);
        const tupleLike = extensions as [QueryExtensionSetup<IdentityExtensions>, QueryExtensionSetup<IdentityExtensions>];
        return SwisstronikQuerier.withExtensions(tmClient, ...tupleLike);
    }
}
