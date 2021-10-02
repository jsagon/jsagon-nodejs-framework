module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    ['module-resolver', {
      alias: {}
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  ignore: [
  ]
}
