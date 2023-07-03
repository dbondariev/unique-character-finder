'use client'

import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";

const OutputText = styled(TextField)`
  margin-top: 10px !important;
  & .MuiInputBase-input {
    color: white;
  }
  color:white;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

function findUniqueCharacter(text: string): string | null {
  const words = text.split(" ");

  const charCount: { [key: string]: number } = words
    .flatMap((word) => Array.from(word))
    .reduce((count: { [key: string]: number }, char: string) => {
      count[char] = (count[char] || 0) + 1;
      return count;
    }, {});

  const uniqueChar = words
    .flatMap((word) => Array.from(word))
    .find((char) => charCount[char] === 1);

  return uniqueChar || null;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState<string | null>(null);

  const runProgram = () => {
    const uniqueChar = findUniqueCharacter(inputText);
    setOutputText(
      uniqueChar !== null ? uniqueChar : "No unique character found."
    );
  };

  return (
    <CenteredBox>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Unique Character Finder
        </Typography>
        <TextField
          id="inputText"
          label="Enter the text"
          multiline
          rows={6}
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          InputProps={{ style: { color: "white" } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={runProgram}
          fullWidth
        >
          Run Program
        </Button>
        <OutputText
          id="outputText"
          label="Result"
          multiline
          rows={2}
          fullWidth
          value={outputText || ""}
          InputProps={{ style: { color: "red" } }}
        />
      </Container>
    </CenteredBox>
  );
}
