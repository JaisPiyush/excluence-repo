import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllMyNFTCollections } from "../../redux/dashboard";
import MultipleSelectCard from "../shared/MultipleSelectCard";

interface AddCollectionsProps {
    onNext: (address: string[]) => void;
}

export default function AddCollections(props: AddCollectionsProps) {
    const [collections, fetchedCollections] = useAppSelector((state) => [
        state.dashboard.createdCollections,
        state.dashboard.fetchedCreatedCollections
    ]);
    const [selectedContracts, setSelectedContracts] = useState<Record<string, boolean>>({})
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!fetchedCollections) {
            dispatch(getAllMyNFTCollections())
        }
    }, []);
    const handleOnSelect = (id: string,  selected: boolean) => {
        selectedContracts[id] = selected;
        setSelectedContracts({...selectedContracts})
    }
    return <MultipleSelectCard
        options={collections.map((collection) => ({id: collection, name: collection}))}
        selected={selectedContracts}
        immutableSelections={[]}
        onSelect={handleOnSelect}
        title="Add Collections"
        onNext={() => {
            props.onNext(Object.keys(selectedContracts))
        }}
        nextButtonTitle="Create Role"
        editable={false}
    />
}