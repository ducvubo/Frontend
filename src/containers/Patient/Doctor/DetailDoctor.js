import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailDoctor: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id; //lấy id trên đường link url
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let {language} = this.props
    let { DetailDoctor } = this.state;
    let nameEn = ''
    let nameVi = ''
    if (DetailDoctor && DetailDoctor.positionData) {
       nameEn = `${DetailDoctor.positionData.valueVi}, ${DetailDoctor.lastName} ${DetailDoctor.firstName} `;
       nameVi = `${DetailDoctor.positionData.valueEn}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  DetailDoctor.image ? DetailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {DetailDoctor &&
                  DetailDoctor.Markdown &&
                  DetailDoctor.Markdown.description && (
                    <span>{DetailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-infor-doctor">
            {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.contentHTML
              && 
              <div>
                <div dangerouslySetInnerHTML={{__html:  DetailDoctor.Markdown.contentHTML}}></div>

              </div>
            }
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
