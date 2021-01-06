import PocketChange from './pocket-change.js';

Hooks.once('init', () => {
  game.settings.register('dfreds-pocket-change', 'enabled', {
    name: 'Enabled',
    hint:
      'If enabled, currency will be generated for tokens dropped in scenes.',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register('dfreds-pocket-change', 'humanoidsOnly', {
    name: 'Humanoids only',
    hint:
      "If enabled, currency will only be generated for NPCs that have a type of 'Humanoid'.",
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register('dfreds-pocket-change', 'chanceOfNoCurrency', {
    name: 'Chance of no currency',
    hint:
      'This is the percent chance that no money will be generated for a token.',
    scope: 'world',
    config: true,
    default: 0.25,
    range: {
      min: 0,
      max: 1,
      step: 0.05,
    },
    type: Number,
  });

  game.settings.register('dfreds-pocket-change', 'currencyMultiplier', {
    name: 'Currency multiplier',
    hint:
      'This multiplies the generated currency by the given number.',
    scope: 'world',
    config: true,
    default: 1,
    range: {
      min: 0,
      max: 2,
      step: 0.1,
    },
    type: Number,
  });

  game.settings.register('dfreds-pocket-change', 'replaceElectrumWithSilver', {
    name: 'Replace electrum with silver',
    hint:
      'If enabled, all electrum pieces will be replaced with silver pieces.',
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });
});

Hooks.on('preCreateToken', (scene, data, options, userId) => {
  const actor = game.actors.get(data.actorId);
  const pocketChange = new PocketChange();

  pocketChange.populateTreasureForActor(data, actor);
});
