module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {}
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
