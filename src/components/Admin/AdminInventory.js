import { TextField } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { sendInventory } from "../services/orderService";
import Card from "../UI/Card";
import style from "./AdminInventory.module.css";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/base";

const AdminInventory = () => {
  // const ctx = useSelector((state) => state.cartReducer);
  // const dispatch = useDispatch();
  const initialState = {
    quantity: 0,
    price: "",
    comment: "",
    vendor: "",
    number: "",
    location: "",
  };
  const [inputValues, setInputValues] = useState(Array(40).fill(initialState));
  const [time, setTime] = useState();
  let pdfRef = useRef();
  let componentRef = useRef();

  const items = [
    "1. Chicken Patties",
    "2. Beef Patties",
    "3. Thigh Pieces",
    "4. Shawarma Chicken Pieces",
    "5. Chicken 9 cut Pieces",
    "6. Wings",
    "7. Fries",
    "8. Paratha",
    "9. Mushroom",
    "10. Cholay",
    "11. Samosa",
    "12. Buns",
    "13. Shawarma Bread",
    "14. Mayo",
    "15. Mayo Garlic",
    "16. Shawarma Hot Sauce",
    "17. Buffalo Sauce",
    "18. Bechamel Sauce",
    "19. Masala",
    "20. Ice Berg",
    "21. Meda",
    "22. Pickle",
    "23. Tomatoes",
    "24. Onions",
    "25. Chimichuri",
    "26. Ketchup packets (Small)",
    "27. Big ketucp sachet",
    "28. Garlic sauce sachet",
    "29. Big Box",
    "30. Small Box",
    "31. Aluminium Box",
    "32. Dip Packets",
    "33. Butter Paper",
    "34. Serving plate",
    "35. Oil",
    "36. Ghee",
    "37. Gas",
    "38. Butter",
    "39. Milk ",
    "40. Cleaning supplies",
  ];
  const throttle = (func, delay) => {
    let lastExecTime = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastExecTime >= delay) {
        lastExecTime = now;
        func(...args);
      }
    };
  };
  const handleInputChange = throttle((index, key, value) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], [key]: value };
      return updatedValues;
    });
  }, 10);

  const downloadPdf = async (e) => {
    e.preventDefault();
    html2canvas(pdfRef.current, { backgroundColor: "#000000" }).then(
      (canvas) => {
        const pdf = new jsPDF("p", "pt", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 650;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        // Calculate the center position.
        const xPos = (pdf.internal.pageSize.width - imgWidth) / 2;
        let yPos = (pdf.internal.pageSize.height - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
        pdf.save(`BabaJanis Inventory.pdf`);
      }
    );
    const inventory = {
      time: time,
      inventory: inputValues.map((input, i) => ({
        item: items[i],
        quantity: input.quantity,
        price: input.price,
        comment: input.comment,
        vendor: input.vendor,
        number: input.number,
        location: input.location,
      })),
    };
    console.log(inventory);
    sendInventory(inventory)
      .then((response) => {
        console.log("Inventory sent successfully:", response);
      })
      .catch((error) => {
        window.alert("Error while Saving Inventory ☹");
        console.log("Error while Saving Inventory:", error);
      });
  };
  const handleInputFocus = (event) => {
    event.target.select();
  };
  useEffect(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentTime = new Date();
    setTime(
      `${currentTime.getDate().toString()}-${
        monthNames[currentTime.getMonth()]
      }-${currentTime.getFullYear().toString()}`
    );
  }, []);

  return (
    <div ref={pdfRef}>
      <h1>
        <u>Inventory Mode On..!</u>
      </h1>
      <Card>
        <form
          className={style.form}
          onSubmit={downloadPdf}
          ref={(e) => (componentRef = e)}
        >
          <span style={{ display: "flex", justifyContent: "flex-end" }}>
            {time}
          </span>
          <table className={style.table}>
            <thead>
              <tr style={{ color: "aqua" }}>
                <th>Item</th>
                <th>Quantity</th>
                <th>Comment</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Number</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {inputValues.map((row, index) => (
                <tr key={index}>
                  <td>{items[index]}</td>
                  <td>
                    {/* <span style={{ color: "aqua" }}>*</span> */}
                    <TextField
                      required ////////////////////////////////////////////////////////////////////////////////////////
                      id="outlined-controlled"
                      type="number"
                      size="small"
                      // placeholder="Quantity"
                      value={row.quantity}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextField
                      id="outlined-controlled"
                      type="text"
                      size="small"
                      // placeholder="Comment"
                      value={row.comment}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "comment", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextField
                      id="outlined-controlled"
                      type="number"
                      size="small"
                      // placeholder="Price"
                      value={row.price}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextField
                      id="outlined-controlled"
                      type="text"
                      size="small"
                      // placeholder="Vendor"
                      value={row.vendor}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "vendor", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextField
                      id="outlined-controlled"
                      type="text"
                      size="small"
                      // placeholder="Number"
                      value={row.number}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "number", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TextField
                      id="outlined-controlled"
                      type="text"
                      size="small"
                      // placeholder="Location"
                      value={row.location}
                      onFocus={(e) => handleInputFocus(e)}
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={style.btn} type="submit">
            Save as PDF
            <SaveAltIcon sx={{ marginLeft: "5px", fontSize: "medium" }} />
          </button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  className={style.btn}
                >
                  Print
                </Button>
              );
            }}
            content={() => componentRef}
            documentTitle="BABA Jani's "
            pageStyle="Print"
          />
        </form>
      </Card>
    </div>
  );
};

export default AdminInventory;
