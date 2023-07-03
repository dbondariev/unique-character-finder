"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomOutputText = styled(TextField)`
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  }
  margin-top: 16px;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  }
  margin-bottom: 16px;
`;

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {},
        },
      },
    },
  },
});

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const runProgram = () => {
    const uniqueChar = findUniqueCharacter(inputText);
    setOutputText(
      uniqueChar !== null ? uniqueChar : "No unique character found."
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="background.default"
      >
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Unique Character Finder
          </Typography>
          <CustomTextField
            inputRef={textAreaRef}
            id="inputText"
            label="Enter the text"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={runProgram}
            fullWidth
          >
            Run Program
          </Button>
          <CustomOutputText
            id="outputText"
            label="Result"
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            value={outputText || ""}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
