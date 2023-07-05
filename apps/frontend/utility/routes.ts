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
    ViewNFT
}

type ViewCollectionArgs = {address: string, name: string}
type ViewNFTArgs = {address: string, name: string, id: string}


type DynamicRouteArgs = ViewCollectionArgs | ViewNFTArgs

export function getDynamicRoute(route: DynamicRoutes, args: DynamicRouteArgs) {
    switch(route) {
        case DynamicRoutes.ViewCollection:
            return `/collection/${args.address}/${args.name}`;
        case DynamicRoutes.ViewNFT:
            let _args = args as ViewNFTArgs;
            return `/nft/${_args.address}/${_args.name}?id=${_args.id}`;
    }
}