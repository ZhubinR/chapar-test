'use client'

import { useState } from "react"
import FormStep1 from "@/components/form/form-steps/FormStep1"
import FormStep2 from "@/components/form/form-steps/FormStep2"
import FormStep3 from "@/components/form/form-steps/FormStep3"
import StepIndicator from "@/components/form/StepIndicator"

interface FormData  {
  fullName: string
  email?: string
  phone?: string
  birthday: string
  skills: string[]
}

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  birthday: "",
  skills: []
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialData)

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className=" container mx-auto bg-[#fafafc] shadow-sm px-12 py-8 rounded-lg">
      <StepIndicator currentStep={step}/>
      {step === 1 && <FormStep1 data={formData} next={next} update={updateForm} />}
      {step === 2 && <FormStep2 data={formData} next={next} back={back} update={updateForm} />}
      {step === 3 && <FormStep3 data={formData} back={back} />}
    </div>
  )
}
