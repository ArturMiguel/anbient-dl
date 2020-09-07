import updateNotifier from 'update-notifier';
import pkg from '../package.json';

export default () => {
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24
    });

    notifier.notify({
        isGlobal: true
    });
};
