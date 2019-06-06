import React from "react";

class Feedback extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card" style={{ marginTop: "130px" }}>
          <div className="card-body text-center">
            <label>Select your feedback category below</label>
            <div
              class="btn-group btn-group-toggle container"
              data-toggle="buttons"
            >
              <label class="btn btn-outline-secondary active">
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autocomplete="off"
                  checked
                />{" "}
                suggestion
              </label>
              <label class="btn btn-outline-secondary ">
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autocomplete="off"
                />{" "}
                complaint
              </label>
            </div>
          </div>
          <hr />
          <form action="" className="container">
            <div class="form-group text-center">
              <label>Please enter your feedback</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                style={{ height: "250px" }}
              />
            </div>
            <button type="submit" class="btn btn-primary mb-2 float-right">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Feedback;
