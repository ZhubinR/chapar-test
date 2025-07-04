"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import SkillBadge from "../SkillBadge";
import { step2Schema } from "@/lib/formValidation";
import { z } from "zod";

interface FormStep2Props {
  data: any;
  next: () => void;
  back: () => void;
  update: (data: any) => void;
}

const FormStep2: React.FC<FormStep2Props> = ({ data, next, back, update }) => {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [inputSkill, setInputSkill] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { skills },
  });

  const addSkill = () => {
    if (inputSkill.trim()) {
      const updatedSkills = [...skills, inputSkill.trim()];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills); // Sync with react-hook-form
      setInputSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills); // Sync with react-hook-form
  };

  const onSubmit = () => {
    update({ skills });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           <h2 className="text-xl font-bold mb-8 pb-4 border-b border-neutral-300">مهارت ها</h2>


      <div className="flex gap-3">
        <input
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          className="input w-3/4"
          placeholder="مثلاً: React"
        />
        <button
          type="button"
          onClick={addSkill}
          className="btn !bg-green-500 w-1/4"
        >
          افزودن
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <SkillBadge key={i} skill={skill} onRemove={removeSkill} />
        ))}
      </div>

      {errors.skills && (
        <p className="text-red-500">{errors.skills.message}</p>
      )}

      <div className="flex justify-between mt-20 pt-6 border-t border-neutral-300">
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded text-neutral-700 bg-neutral-300 cursor-pointer"
        >
          قبلی
        </button>
        <button type="submit" className="btn">
          مرحله بعد
        </button>
      </div>
    </form>
  );
};

export default FormStep2;
