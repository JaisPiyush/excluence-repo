import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { findMySyntheticRoles } from "../../../redux/dashboard";
import MultipleSelectCard from "../../shared/MultipleSelectCard";

export default function ProfileCreatedRoles() {
    const [syntheticRoles, fetchedSyntheticRoles] = useAppSelector((state) => [
        state.dashboard.syntheticRoles,
        state.dashboard.fetchedSyntheticRoles
    ]);
    const dispatch = useAppDispatch();
    useEffect(() =>{
        if (!fetchedSyntheticRoles){
            dispatch(findMySyntheticRoles());
        }
    }, []);
    const rolesAsPacket = syntheticRoles.map((role) => {
        return {id: role._id as string, name: role.name}
    })
    console.log(rolesAsPacket);
    return <MultipleSelectCard
        options={rolesAsPacket}
        selected={{}}
        onNext={() => {}}
        onSelect={(id, selected) => {}}
        title=""
        immutableSelections={[]}
        editable={false}
    />
}