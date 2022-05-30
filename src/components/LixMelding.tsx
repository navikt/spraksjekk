function LixMelding(props: { lix: number; }) {
    const lix = props.lix;
    let lixMelding = "";

    // LIX begrunnelse
    if (lix < 24) {
        lixMelding = "veldig enkel å lese";
    }
    if (lix > 23 && lix < 34) {
        lixMelding = "enkel å lese";
    }
    if (lix > 33 && lix < 44) {
        lixMelding = "middels vanskelig å lese";
    }
    if (lix > 43 && lix < 54) {
        lixMelding = "vanskelig å lese";
    }
    if (lix > 53) {
        lixMelding = "veldig vanskelig å lese";
    }

    return (
      <>{lixMelding}</>
    );
}

export default LixMelding;