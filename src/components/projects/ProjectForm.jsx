import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

// 프로젝트 생성 폼
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    dueDate: project?.dueDate || ""
  });

  // 내용 변경시
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 저장 버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();

    // 날짜 포맷 변환
    const date = formData.dueDate ? new Date(formData.dueDate) : new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    onSave({
      ...formData,
      dueDate: formattedDate
    });
  };

  return (
    <div className="w-full bg-gray-100 p-8 rounded-md">
      <form onSubmit={handleSubmit}>
        <Input
          label="TITLE"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />

        <Input
          label="DESCRIPTION"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          type="textarea"
        />

        <Input
          label="DUE DATE"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Button variant="cancel" onClick={onCancel}>Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;