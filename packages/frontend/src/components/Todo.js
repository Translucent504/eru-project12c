import React, { useState } from "react";
import { Card, Checkbox, Flex, Label, Text } from "theme-ui";

const Todo = ({ todo, onChange }) => {
  const [content, setContent] = useState(todo.content);
  const [completed, setCompleted] = useState(todo.completed);
  return (
    <Flex sx={{ background: "white", marginTop: "1rem" }}>
      <Label sx={{ cursor: "pointer" }}>
        <Checkbox
          defaultChecked={completed}
          onChange={() => {
            onChange();
            setCompleted((c) => !c);
          }}
        />
        <Text
          sx={{
            fontSize: 4,
            fontWeight: "bold",
            textDecoration: completed ? "line-through" : "",
          }}
        >
          {content}
        </Text>
      </Label>
    </Flex>
  );
};

export default Todo;
