import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function DeletableChips({ chipDelete, text }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={text}
        variant="outlined"
        onDelete={chipDelete}
      />
    </Stack>
  );
}
