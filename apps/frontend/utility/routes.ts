export enum Routes {
    CreateCollection = '/create/collection',
    CreateNFT = '/create/nft',
    Dashboard = '/dashboard',
    ImportCollection = '/collection/import',
    DashboardCollections = '/dashboard?tab=collections',
    DashboardCreated = '/dashboard?tab=created',
    DashboardOwned = '/dashboard?tab=owned'
}

export enum DynamicRoutes {
    ViewCollection,
}

type ViewCollectionArgs = {address: string, name: string}
type DynamicRouteArgs = ViewCollectionArgs

export function getDynamicRoute(route: DynamicRoutes, args: DynamicRouteArgs) {
    switch(route) {
        case DynamicRoutes.ViewCollection:
            return `/collection/${args.address}/${args.name}`;
    }
}