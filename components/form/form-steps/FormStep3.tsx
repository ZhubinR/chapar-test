"use client";

interface FormStep3Props {
  data: any;
  back: () => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ data, back }) => {
  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...data,
        birthday: new Date(data.birthday).toISOString().slice(0, 10), // YYYY-MM-DD
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
      if (!res.ok) throw new Error("ارسال با خطا مواجه شد");
      alert("اطلاعات با موفقیت ارسال شد!");
    } catch (err) {
      alert("خطا در ارسال اطلاعات");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-8 pb-4 border-b border-neutral-300">
        {" "}
        چک و ارسال
      </h2>

      <div className="flex flex-col gap-4">
        <p className="flex gap-2">
          <strong>نام:</strong> {data.fullName}
        </p>
        <p className="flex gap-2">
          <strong>ایمیل:</strong> {data.email}
        </p>
        <p className="flex gap-2">
          <strong>موبایل:</strong> {data.phone}
        </p>
        <p className="flex gap-2">
          <strong>تاریخ تولد:</strong>{" "}
          <span className="text-right">
            {" "}
            {new Date(data.birthday).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="flex gap-2">
          <strong>مهارت‌ها:</strong> {data.skills.join(", ")}
        </p>
      </div>

      <div className="flex justify-between mt-20 pt-6 border-t border-neutral-300">
        <button
          onClick={back}
          className="px-4 py-2 rounded text-neutral-700 bg-neutral-300 cursor-pointer"
        >
          قبلی
        </button>
        <button onClick={handleSubmit} className="btn">
          ارسال
        </button>
      </div>
    </div>
  );
};

export default FormStep3;
