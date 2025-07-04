"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { step1Schema } from "@/lib/formValidation";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";

interface FormStep1Props {
  data: any;
  next: () => void;
  update: (data: any) => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ data, next, update }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      ...data,
      birthday: data.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : "",
    },
  });

  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    data.birthday
      ? new DateObject({ date: new Date(data.birthday), calendar: persian })
      : null
  );

  const onSubmit = (values: z.infer<typeof step1Schema>) => {
    if (!selectedDate) {
      alert("تاریخ تولد الزامی است.");
      return;
    }

    // Convert Jalali to Gregorian and extract parts
    const birthDate = selectedDate.convert(gregorian);
    const birthYear = birthDate.year;
    const birthMonth = birthDate.month.index; // 0-based month (0 for Jan)
    const birthDay = birthDate.day;

    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth(); // 0-based
    const nowDay = now.getDate();

    let age = nowYear - birthYear;
    if (
      nowMonth < birthMonth ||
      (nowMonth === birthMonth && nowDay < birthDay)
    ) {
      age--;
    }

    if (age < 18) {
      alert("سن باید حداقل ۱۸ سال باشد.");
      return;
    }

    const gregorianDate = birthDate.toDate();
    update({ ...values, birthday: gregorianDate.toISOString() });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-8 pb-4 border-b border-neutral-300">اطلاعات شخصی</h2>

      <div className="space-y-4 grid grid-cols-2 gap-6">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="name">نام کامل</label>
          <input
            {...register("fullName")}
            className="input"
            id="name"
            placeholder="John Marston"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">ایمیل</label>
          <input
            {...register("email")}
            className="input"
            placeholder="example@something.domain"
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {errors.email && errors.phone && (
        <p className="text-red-500">
          حداقل یکی از فیلد های ایمیل یا شماره موبایل پر شود.
        </p>
      )}
        </div>

        <div className="flex flex-col gap-2">
          <label>شماره موبایل</label>
          <input
            {...register("phone")}
            className="input"
            type="number"
            placeholder="09XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
          {errors.email && errors.phone && (
            <p className="text-red-500">
              حداقل یکی از فیلد های ایمیل یا شماره موبایل پر شود.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>تاریخ تولد</label>
          <DatePicker
            value={selectedDate}
            onChange={(date: DateObject) => {
              setSelectedDate(date);
              if (date) {
                const gregorianDate = date.convert(gregorian).toDate();
                update({ ...data, birthday: gregorianDate.toISOString() });
              }
            }}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            inputClass="input"
            format="YYYY/MM/DD"
          />
          {errors.birthday && (
            <p className="text-red-500">{errors.birthday.message}</p>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-center mt-20 pt-6 border-t border-neutral-300">
        <button type="submit" className="btn w-1/2 mt-5">
          مرحله بعد
        </button>
      </div>
    </form>
  );
};

export default FormStep1;
