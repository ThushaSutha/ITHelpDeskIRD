import React,{useState} from "react";
import axios from "axios";

const Help = () => {
  const [formData, setFormData] = useState("");
  const [displayData, setDisplayData] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFormData({ ...formData, path: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("gender", formData.gender);
    data.append("image", formData.path);

    axios
      .post("http://localhost:8080/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for FormData
        },
      })
      .then((response) => {
        console.log("File uploaded successfully");
        // Add the new data to the displayData state
        setDisplayData([...displayData, formData]);
      })
      .catch((error) => {
        console.log("Error in post data: " + error.message);
      });

    // Reset form data after submission
    setFormData({
      name: "",
      gender: "",
      path: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            onChange={handleChange}
            checked={formData.gender === "male"}
          />
          <label htmlFor="male">Male</label>
          
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={handleChange}
            checked={formData.gender === "female"}
          />
          <label htmlFor="female">Female</label>
        </div>

        <input type="file" name="image" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>
                {data.path && (
                  <img
                    src={URL.createObjectURL(data.path)}
                    alt={data.name}
                    width="50"
                    height="50"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Help;
