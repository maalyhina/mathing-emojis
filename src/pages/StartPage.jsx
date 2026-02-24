import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LevelSelector from "../components/LevelSelector";

const schema = yup.object({
  level: yup.string().required("Please select a level"),
});

export default function StartPage({ onStart }) {
  const savedLevel = localStorage.getItem("selectedLevel") || "1 (3×2)";
  const [selectedLevel, setSelectedLevel] = useState(savedLevel);

  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { level: savedLevel },
  });

  useEffect(() => {
    localStorage.setItem("selectedLevel", selectedLevel);
  }, [selectedLevel]);

  const onSubmit = (data) => {
    localStorage.setItem("selectedLevel", data.level);
    onStart(data.level);
  };

  const handleSelect = (level) => {
    setSelectedLevel(level);        
    setValue("level", level, { shouldValidate: true }); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="page">
      <p className="lead">Menu</p>

      <LevelSelector
        selectedLevel={selectedLevel}
        onSelect={handleSelect}
      />

      {errors.level && <p className="error">{errors.level.message}</p>}

      <button type="submit">Start Game</button>
    </form>
  );
}
