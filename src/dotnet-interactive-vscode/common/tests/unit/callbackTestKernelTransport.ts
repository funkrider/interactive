// Copyright (c) .NET Foundation and contributors. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KernelCommand, KernelCommandType, KernelEventEnvelopeObserver, DisposableSubscription, KernelEventEnvelope, KernelTransport, KernelCommandEnvelopeHandler, KernelCommandEnvelope } from '../../interfaces/contracts';

// executes the given callback for the specified commands
export class CallbackTestKernelTransport implements KernelTransport {
    private theObserver: KernelEventEnvelopeObserver | undefined;

    constructor(readonly fakedCommandCallbacks: { [key: string]: () => KernelEventEnvelope }) {
    }

    subscribeToKernelEvents(observer: KernelEventEnvelopeObserver): DisposableSubscription {
        this.theObserver = observer;
        return {
            dispose: () => { }
        };
    }

    setCommandHandler(handler: KernelCommandEnvelopeHandler) {

    }

    async submitCommand(commandEnvelope: KernelCommandEnvelope): Promise<void> {
        return new Promise((resolve, reject) => {
            const commandCallback = this.fakedCommandCallbacks[commandEnvelope.commandType];
            if (!commandCallback) {
                reject(`No callback specified for command '${commandEnvelope.commandType}'`);
                return;
            }

            const eventEnvelope = commandCallback();
            if (this.theObserver) {
                this.theObserver(eventEnvelope);
            }

            resolve();
        });
    }

    publishKernelEvent(eventEnvelope: KernelEventEnvelope): Promise<void> {
        throw new Error("Stdio channel doesn't currently support a back channel");
    }

    waitForReady(): Promise<void> {
        return Promise.resolve();
    }

    dispose() {
        // noop
    }
}
