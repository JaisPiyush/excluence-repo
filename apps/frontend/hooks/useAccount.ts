import { useAppSelector } from "@/redux-store/index"

export function useAccount() {
    const [user] = useAppSelector(state => [state.account.user])
    return user
}