import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import { gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import Preferences from '../../../prefs.js';
import { registerClass } from '../../common/gjs.js';
import { CopyousSettings } from '../../common/settings.js';
import { makeResettable } from '../utils.js';

@registerClass()
export class LazyCopyousSettings extends Adw.PreferencesGroup {
	constructor(prefs: Preferences) {
		super({ title: _('Lazy Copyous') });

		const initialBatchSize = new Adw.SpinRow({
			title: _('Initial Item Batch Size'),
			subtitle: _('Number of items rendered immediately when opening the clipboard dialog'),
			adjustment: new Gtk.Adjustment({ lower: 1, upper: 100, step_increment: 1, value: 12 }),
		});
		this.add(initialBatchSize);

		const lazyBatchSize = new Adw.SpinRow({
			title: _('Lazy Item Batch Size'),
			subtitle: _('Number of items rendered in each lazy-loading batch'),
			adjustment: new Gtk.Adjustment({ lower: 1, upper: 100, step_increment: 1, value: 16 }),
		});
		this.add(lazyBatchSize);

		const settings: CopyousSettings = prefs.getSettings();
		settings.bind('initial-item-batch-size', initialBatchSize, 'value', Gio.SettingsBindFlags.DEFAULT);
		settings.bind('lazy-item-batch-size', lazyBatchSize, 'value', Gio.SettingsBindFlags.DEFAULT);
		makeResettable(initialBatchSize, settings, 'initial-item-batch-size');
		makeResettable(lazyBatchSize, settings, 'lazy-item-batch-size');
	}
}
