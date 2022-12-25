function LixResultMessage(props: { lix: number; }) {
    const lix = props.lix;
    let lixMelding = "";

    // LIX begrunnelse
    if (lix < 24) {
        lixMelding = "Veldig enkel å lese";
    }
    if (lix > 23 && lix < 34) {
        lixMelding = "Enkel å lese";
    }
    if (lix > 33 && lix < 44) {
        lixMelding = "Middels å lese";
    }
    if (lix > 43 && lix < 54) {
        lixMelding = "Vanskelig å lese";
    }
    if (lix > 53) {
        lixMelding = "Veldig vanskelig å lese";
    }

    return (
        <>{lixMelding}</>
    );
}

export default LixResultMessage;