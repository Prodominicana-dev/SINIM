import React from "react";

export default function Page() {
  return (
    <div className="w-full sm:px-10 py-5 h-[80vh]">
      <iframe
        className="w-full h-full"
        title="Report Section"
        src="https://app.powerbi.com/view?r=eyJrIjoiNGJiYzU5ZWYtYjFmNS00Yjk0LTg1ZWQtMzVmNjk0OWMxY2MxIiwidCI6IjEwZWExNTgyLWY4NjMtNGJkNC1hZjA5LTNjNzQ1ZTczNWMwNSIsImMiOjJ9"
      ></iframe>
    </div>
  );
}
