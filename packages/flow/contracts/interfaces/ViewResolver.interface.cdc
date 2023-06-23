
pub contract interface ViewResolver {

    pub fun getViews(): [Type] {
        return []
    }

    pub fun resolveView(_ view: Type): AnyStruct? {
        return nil
    }
}
 