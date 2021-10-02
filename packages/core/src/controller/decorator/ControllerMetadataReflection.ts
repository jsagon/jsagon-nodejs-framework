export const META_DATA_REFLECT_ROUTE = 'MetaDataRoute'

export interface ControllerMetadata {
    MetaDataRoute: {[key: string] : any }
}

export class ControllerMetadataReflection {
  public static setControllerMetadata (target: ControllerMetadata, key: string, value: any): void {
    target[META_DATA_REFLECT_ROUTE][key] = value
  }

  public static setActionMetadata (target: ControllerMetadata, action: string, data: {}): void {
    const metaRoute = target[META_DATA_REFLECT_ROUTE] || { actions: {} }
    const actionMeta = metaRoute.actions[action]

    if (actionMeta) metaRoute.actions[action] = Object.assign(actionMeta, data)
    else metaRoute.actions[action] = data

    Object.defineProperty(target, META_DATA_REFLECT_ROUTE, { value: metaRoute, configurable: true })
  }

  public static getMetadataRoute (target: ControllerMetadata) {
    return target[META_DATA_REFLECT_ROUTE]
  }
}

export const RouteBinder = (httpMethod: string): Function => {
  return (uri: string = ''): Function => {
    return (target: ControllerMetadata, action: string): void => {
      ControllerMetadataReflection.setActionMetadata(target, action, { action, uri, httpMethod })
    }
  }
}
