const promise = require("promise");
const request = require("request");
const ROOT_DIR = require("path").resolve();
var portfolio_data = require('./store/moumita_portfolio_data.js');
var generic_portfolio_data = require('./store/generic_portfolio_data.js');

// console.log("@@@ portfolio data :: ", portfolio_data);
const default_style = {theme_color: "#EA825C"};

function createProductListingContainerTemplate(data){
  // console.log("===== createProductListingContainerTemplate fun is calling =====");
  let template = '';
  let eachItemTemplate = '';
  data.forEach((item, index) => {
      eachItemTemplate += `
          <div class="work-item" style="">
              <div>
                  <img src="`+item.img+`"  onclick="onClick(this)" class="w3-hover-opacity custom-portfolio-img" alt="">
              </div>
          </div>
      `;
  })
  template = `
      <div id="productListingContainer" style="width: 100%; display: block;">
        `+eachItemTemplate+`
      </div>
  `;

  return template;
}

function sectionHeadingTemplate(data){
    let template = '';
        if(data.char !== null && data.char !== ''){
            template += data.char;
        }
        if(data.img !== null && data.img !== ''){
            template += '<img src="'+data.img+'" alt="" class="custom-title-prefix-img" style="width: 50px;"/>';
        }
    return template;
}

function createAboutMeSection(data){
  let template = "";
  let aboutMeAttributesTemplate = '';
  let attributes = data.sectionAttributes;
  let headingPrefixCharTemplate = '';
  if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
      headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
  }
  if(attributes !== null && attributes !== undefined){
      attributes.forEach((item, index) => {
          aboutMeAttributesTemplate += `
              <div class="about-me-each-attrribute" style="`+item.style+`">
                  <span style="padding: 10px 0px; margin-right: 0px; color: `+default_style.theme_color+`;"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
                  <span style="padding: 10px 5px; margin-right: 0px;"><strong>`+item.key+` : </strong></span>
                  <span style="padding: 10px 5px; margin-right: 2px;">`+item.value+`</span>
              </div>
          `;
      });
  }
  template = `
    <div class="custom-about-block">
      <div class="heading-title-block" style="">
        <h3 class=" heading-title-layout">
        <span>`+headingPrefixCharTemplate+`</span>
        <span>About Me</span>
        </h3>
        <hr class="small-hr" >
      </div>
      <div class="custom-content-block custom-about-me-content-section" style="">
          <p class="w3-center"><em><span>`+data.blockHeading+`</span></em></p>
          <p class="work-desc-heading" style="text-transform: lowercase; font-size: 18px;">
            <span>`+data.sectionHeaderContent+`</span>
          </p>

          <div class="" style="width: 100;">
            <div class="about-me-profile-block" style="">
              <div>
                <img class="about-me-profile-pic" src="`+data.sectionImgUrl+`" class="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" style="">
              </div>
              <p class="w3-center" style=""><b class="customabout-me-profile-name"><span >`+data.name+`</span></b></p>
            </div>

            <!-- Hide this text on small devices -->
            <div class="about-me-profile-desc-block" style="">
              <div class="custom-about-me-title">
                <h1 style="font-weight: 600;">`+data.workProfile+`</h1>
              </div>
              <div>
                <p class="work-desc-heading" style="text-transform: lowercase; font-size: 18px;">
                  <span>`+data.sectionBodyContent+`</span>
                </p>
              </div>

              <div class="custom-about-me-attributes" id="custom_about_me_attributes" style="width: 100; display: block;">
                `+aboutMeAttributesTemplate+`
              </div>
            </div>
          </div>
      </div>
    </div>
  `;

// <i class="fa fa-user" style="color: `+default_style.theme_color+`; position: relative; right: 5px;"></i>
  return template;
}

function createEducationSectionTemplate(data){
  let template = "";
  let allEducationTemplate = '';
  let headingPrefixCharTemplate = '';
  if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
      headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
  }
  data.educations.forEach((item, index) => {
      let subDegreeTemplate = '';
      if((item.degreeStartYear && item.degreeStartYear !== '') && (item.degreeEndYear && item.degreeEndYear !== '')){
          subDegreeTemplate += `
            <p>
              <span>`+item.degreeStartYear+` </span>
              <span> - </span>
              <span>`+item.degreeEndYear+`</span>
            </p>
          `;
      }
      allEducationTemplate += `
            <div class="custom-each-education-section" id="custom_each_education_section" style="`+item.sectionStyle+`">
                <div style="width: 14px; height: 14px; border-radius: 50%; position: relative; left: -21px; top: -2px">
                    <img src="static/images/final_portfolio/icon/education_icon.png" alt="" style="width: 20px; height: 20px;"/>
                </div>
                <div class="custom-education-section-degree">
                    <div  style="font-weight: 400;"><span>`+item.degree+`</span></div>
                      `+subDegreeTemplate+`
                    <p  style="font-weight: 400;">
                      <span><em>`+item.degreeInstitute+`</em></span>
                    </p>
                    <div  style="font-weight: 400;">
                      <span>`+item.degreeDesc+`</span>
                    </div>
                </div>

            </div>
      `;
  })
  template = `
      <div class="custom-container" style="background: white;">
        <div class="heading-title-block" style="">
          <h3 class=" heading-title-layout">
          <span>`+headingPrefixCharTemplate+`</span>
          <span>Education</span>
          </h3>
          <hr class="small-hr" >
        </div>
        <div class="custom-education-section custom-content-block" id="custom_education_section" style="width: 100%;">
            `+allEducationTemplate+`
        </div>
      </div>
  `;
  return template;
}

function createProfessionalExpTemplate(data){
    let template = '';
    let allWorkExp = '';
    let headingPrefixCharTemplate = '';
    if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
        headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
    }
    data.experiences.forEach((item, index) => {
        let descTemplate = '';
        if(item.expDesc !== null && item.expDesc !== undefined && item.expDesc.length > 0){
            descTemplate += '<ul>';
            item.expDesc.forEach((exp, index) => {
                descTemplate += '<li>'+exp.shortExpDesc+'</li>';
            });
            descTemplate += '</ul>';
        }
        allWorkExp += `
              <div class="custom-each-work-exp-section" id="custom_each_work_exp_section" style="`+item.sectionStyle+`">
                  <div style="width: 14px; height: 14px; border-radius: 50%; position: relative; left: -21px; top: -2px;">
                      <img src="static/images/final_portfolio/icon/work_experience_icon.png" alt="" style="width: 20px; height: 20px;"/>
                  </div>
                  <div class="custom-education-section-degree">
                      <div style=""><span>`+item.companyProfile+`</span></div>
                      <p style="font-weight: 400;">
                        <span>`+item.companyProfileStartYear+` </span>
                        <span> - </span>
                        <span>`+item.companyProfileEndYear+`</span>
                      </p>
                      <p style="font-weight: 400;">
                        <span><em>`+item.companyName+`</em></span>
                      </p>
                      <div style="font-weight: 400;">
                        <span>`+descTemplate+`</span>
                      </div>
                  </div>

              </div>
        `;
    })
    template = `
        <div class="custom-container" style="background: white;">
          <div class="heading-title-block" style="">
            <h3 class=" heading-title-layout">
              <span>`+headingPrefixCharTemplate+`</span>
              <span>Professional Experience</span>
            </h3>
            <hr class="small-hr" >
          </div>
          <div class="custom-content-block custom-work-exp-section " id="custom_work_exp_section" style="width: 100%;">
              `+allWorkExp+`
          </div>
        <div>
    `;
    return template;
}

function getCircularProgressBarTemplate(percent){
    let progressPercentageClass = 'p'+percent;
    let template = `
    <div class="progress-circle `+progressPercentageClass+`">
        <span>`+percent+`%</span>
        <div class="left-half-clipper">
          <div class="first50-bar"></div>
          <div class="value-bar"></div>
        </div>
    </div>
    `;
    return template;
}

function getProgressBarTemplate(percent){
  return `
    <div class="custom-skillset-progress-bar">
      <div class="w3-container  w3-dark-grey w3-center custom-skillset-bar" style="width:`+percent+`">
          <div class="custom-skill-track-percentage" >`+percent+`</div>
      </div>
    </div>
  `;
}

function getRankTemplate(rating){
  return `
    <div>
      <span style="font-size: 32px;position: relative;top: -12px;left: 7px;font-weight: 900; color: `+default_style.theme_color+`; `+rating.style+`">`+rating.rank+`</span>
      <span style="font-size: 32px; font-weight: 400;">/</span>
      <span style="font-size: 18px;position: relative;top: 7px;left: -7px; font-weight: 400;">10</span>
    </div>
  `;
}

function createAdditionalTemplate(data){
    let template = '<div style="'+data.style+'">';
    data.features.forEach((item, index) => {
        template += '<div class="custom-additional-block" style="'+item.secStyle+'">';

        template += '<div style="font-size: 18px; font-weight: 600; color: black; margin-top: 20px; margin-bottom: 10px; "># <span>'+item.skillName+'</span></div>';
        if(item.skillDesc && item.skillDesc !== ''){
            template += '<div><span>'+item.skillDesc+'</span></div>';
        }
        if(item.skillDesc && item.skillDesc !== ''){
            template += '<div><span>'+item.skillDesc+'</span></div>';
        }

        if(item.skillDetails && item.skillDetails !== '' && item.skillDetails.length > 0){
            item.skillDetails.forEach((item, index) => {
                let descTemplate = '';
                let rankTemplate = '';
                let shortDescTemplate = '';
                if(item.shortDesc && item.shortDesc !== ''){
                    shortDescTemplate += '<div style="font-weight: 16px; font-weight: 400; margin-top: 5px;"><span>'+item.shortDesc+'</span></div>';
                }
                if(item.rating && item.rating !== ''){
                    rankTemplate = getRankTemplate(item.rating);
                }
                if(item.desc && item.desc !== '' && item.desc.length > 0 ){
                    descTemplate += '<div>';
                    item.desc.forEach((item, index) => {
                      descTemplate += `
                          <div style="margin-top: 10px; font-size: 16px;">
                              <span style="`+item.key.style+`">`+item.key.name+`</span>
                              <span style="`+item.key.style+`">`+item.value.name+`</span>
                          </div>
                      `;
                    });
                    descTemplate += '</div>';
                }
                template += `
                    <div class="custom-additional-skill-each-section" style="display: inline-block; `+item.sectionStyle+`">
                        <div style="font-weight: 600; width: 100%;">
                              <span style="font-size: 18px;">`+item.name+`</span>
                              <span style="float: right;">`+rankTemplate+`</span>
                              <div>`+shortDescTemplate+`</div>
                        </div>
                        <div>
                            `+descTemplate+`
                        </div>
                    </div>
                `;
            });
        }

        template += '</div>';

    });
    template += '</div>';

    return template;
}

function createSkillsetTemplate(data){
  let template = '';
  let skillsTemplate = '';
  let headingPrefixCharTemplate = '';
  let additionalSkillsetTemplate = '';
  if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
      headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
  }
  data.primarySkill.forEach((item, index) => {
      let iconTemplate = '';
      let progressBarTemplate = '';
      if(item.icon !== null){

      }
      if(item.iconImgUrl !== null){
          iconTemplate += '<img src="'+item.iconImgUrl+'" alt="">'
      }
      if(item.percentage && item.percentage !== ''){
          progressBarTemplate = getProgressBarTemplate(item.percentage);
      }
      skillsTemplate += `
          <div class="each-skillset-section" style=" `+item.sectionStyle+`">
            <p class=" skillset-title">
              `+iconTemplate+`
              <span class="skillset-title-txt">`+item.skill+`</span>
            </p>
            <div>`+progressBarTemplate+`</div>
          </div>
      `;
  });

  if(data.additionalSkill && data.additionalSkill.features.length > 0){
      additionalSkillsetTemplate = createAdditionalTemplate(data.additionalSkill);
  }

  template += `
      <div class="custom-container" style="background: white;">
        <div class="heading-title-block">
          <h3 class=" heading-title-layout">
          <span>`+headingPrefixCharTemplate+`</span>
          <span>Skill Set</span>
          </h3>
          <hr class="small-hr">
        </div>
        <div class="custom-skillset-section custom-content-block" style="width: 100%;">
          `+skillsTemplate+`
        </div>
        <div>
          `+additionalSkillsetTemplate+`
        </div>
      </div>
  `;
  return template;
}

function createContactsMeTemplate(data){
  let template = '';
  let contactsTemplate = '';
  let contactsInfoTemplate = '';
  let headingPrefixCharTemplate = '';
  if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
      headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
  }

  if(data.contacts !== null && data.contacts !== undefined && data.contacts.length > 0){
      contactsTemplate += '<div style="width: 100%;">';
      data.contacts.forEach((item, index) => {
            contactsTemplate += `
                <div class="custom-contacts-each-block" style="display: inline-block; width: 30%; padding: 16px; margin-right: 10px; background: #f7f7f7;">
                    <div>`+item.icon+`</div>
                    <div style="font-size: 18px;font-weight: 600; margin-top: 10px; ">`+item.name+`</div>
                    <div style="font-size: 16px; margin-top: 10px; ">`+item.values+`</div>
                    <div style="">`+item.desc+`</div>
                </div>
            `;
      });
      contactsTemplate += '</div>';
  }

  if(data.contactsInfo !== undefined && data.contactsInfo !== null && data.contactsInfo !== ''){
    contactsInfoTemplate += '<div style="width: 100%; margin-top: 16px;">';
    data.contactsInfo.forEach((item, index) => {
          if(item.map !== null && item.map !== undefined && item.map !== ''){
              contactsInfoTemplate += `
                <div class="custom-contacts-each-block custom-contacts-map-section" style="`+item.style+`">
                    <img src="`+item.map.imgUrl+`" alt=""  style="`+item.map.style+`" />
                </div>
              `;
          }

          if(item.inputs !== null && item.inputs !== undefined && item.inputs !== ''){
                contactsInfoTemplate += '<div class="custom-contacts-each-block" style="'+item.style+'">';
                item.inputs.forEach((item, index) => {
                  if(item.inputType === "text"){
                      contactsInfoTemplate += '<input type="text" placeholder="'+item.placeholder+'" style="'+item.style+'"/>';
                  }
                });
                contactsInfoTemplate += '</div>';
          }

          if(item.submitSec !== undefined && item.submitSec !== null && item.submitSec !== ''){
                contactsInfoTemplate += '<div class="custom-contacts-each-block" style="'+item.style+'">';
                item.submitSec.forEach((item, index) => {
                    if(item.inputType === "textarea"){
                      contactsInfoTemplate += '<textarea class="custom-contacts-msg-area" rows="'+item.row+'" cols="'+item.col+'" placeholder="'+item.placeholder+'" style="'+item.style+'"> </textarea>';
                    }
                    if(item.inputType === "button"){
                      contactsInfoTemplate += '<input type="button" value="'+item.name+'" style="'+item.style+'"/>';
                    }
                });
                contactsInfoTemplate += '</div>';
          }
    });
    contactsInfoTemplate += '</div>';

  }

  template = `
      <div class="custom-container" style="background: white;">
        <div class="heading-title-block" style="">
          <h3 class=" heading-title-layout">
            <span>`+headingPrefixCharTemplate+`</span>
            <span>`+data.title+`</span>
            <div>`+data.heading+`<div/>
          </h3>
          <hr class="small-hr" >
        </div>
        <div class="custom-work-exp-section custom-content-block" id="custom_work_exp_section" style="width: 100%;">
            `+contactsTemplate+`
            `+contactsInfoTemplate+`
        </div>
      <div>
  `;
  return template;

}

function createKnownLanguagesTemplate(data){
  let template = '';
  let langTemplate = '';
  let headingPrefixCharTemplate = '';
  if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
      headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
  }
  data.languages.forEach((item, index) => {
      let setupMotherToungeColor = '';
      // if(item.motherTongue === 'yes'){
      //       setupMotherToungeColor += 'border-bottom: 5px solid '+default_style.theme_color+';';
      // }
      langTemplate += '<div class="custom-language-each-block" style="'+item.style+'; '+setupMotherToungeColor+'">';
        // icon block
        if(item.icon && item.icon.type === "fontAwesome"){
            langTemplate += '<div><i class="fa fa-'+item.icon.name+'" aria-hidden="true" style="'+item.icon.style+'"></i></div>'
        }
        // language name block
        if(item.motherTongue === 'yes'){
            langTemplate += '<div style="margin-top: 10px; font-size: 18px; font-weight: 600;">'+item.lang+'<span style="font-size: 15px; color: '+default_style.theme_color+'; position: relative; top: 6px; float: right; ">Native Speech</span></div>';
        }else{
            langTemplate += '<div style="margin-top: 10px; font-size: 18px; font-weight: 600;">'+item.lang+'</div>';
        }
        // language read write block
        langTemplate += '<div style="width: 100%; margin-top: 10px; ">';
            // read block
            langTemplate += '<div style="display: inline-block; width: 100%; ">';

                if(item.read === 'yes'){
                    langTemplate += '<span style="float: left; color: green;">Read</span>';
                    langTemplate += '<span style="float: right;"><i class="fa fa-check" aria-hidden="true" style="font-size: 18px; color: green;"></i></span>';
                }else{
                    langTemplate += '<span style="float: left; color: red;">Read</span>';
                    langTemplate += '<span style="float: right;"><i class="fa fa-times" aria-hidden="true" style="font-size: 18px; color: red;"></i></span>';
                }
            langTemplate += '</div>';
            // write block
            langTemplate += '<div style="display: inline-block; width: 100%;">';
                if(item.write === 'yes'){
                    langTemplate += '<span style="float: left; color: green;">Write</span>';
                    langTemplate += '<span style="float: right;"><i class="fa fa-check" aria-hidden="true" style="font-size: 18px; color: green;"></i></span>';
                }else{
                    langTemplate += '<span style="float: left; color: red;">Write</span>';
                    langTemplate += '<span style="float: right;"><i class="fa fa-times" aria-hidden="true" style="font-size: 18px; color: red;"></i></span>';
                }
            langTemplate += '</div>';

        langTemplate += '</div>';

      langTemplate += '</div>';

  });

  template += `
      <div class="custom-container" style="background: white;">
        <div class="heading-title-block">
          <h3 class=" heading-title-layout">
            <span>`+headingPrefixCharTemplate+`</span>
            <span>`+data.title+`</span>
            <div style="">`+data.heading+`</div>
          </h3>
          <hr class="small-hr">
        </div>
        <div class=" custom-content-block custom-language-section" style="width: 100%;">
          `+langTemplate+`
        </div>
      </div>
  `;
  return template;
}

function createProjectSectionTemplate(data){
    let template = '';
    let langTemplate = '';
    let headingPrefixCharTemplate = '';
    let additionalTemplate = '';
    if(data.sectionHeadingPrefix !== null && data.sectionHeadingPrefix !== undefined && data. sectionHeadingPrefix !== ''){
        headingPrefixCharTemplate = sectionHeadingTemplate(data.sectionHeadingPrefix);
    }

    template += `
        <div class="custom-container" style="background: white;">
          <div class="heading-title-block">
            <h3 class=" heading-title-layout">
              <span>`+headingPrefixCharTemplate+`</span>
              <span>`+data.title+`</span>
              <div style="">`+data.heading+`</div>
            </h3>
            <hr class="small-hr">
          </div>
      `;
    template += '<div class="custom-project-content-block">';
    if(data.projects && data.projects !== '' && data.projects.length > 0){
        let descTemplate = '';
        data.projects.forEach((item, index) => {
          let separatorTemplate = '';

          descTemplate = '';
          if(item.additionalFeature ){
              additionalTemplate = createAdditionalTemplate(item.additionalFeature);
          }
          if(item.separator && item.separator !== ''){
              separatorTemplate += item.separator;
          }

          if(item.header.desc && item.header.desc !== '' && item.header.desc.details.length > 0 ){
              descTemplate += '<div style="width: 100%;">';
              item.header.desc.details.forEach((ele, index) => {
                descTemplate += `
                    <div class="custom-project-header-desc-section" style="display: inline-block;`+item.header.desc.secStyle+`">
                        <span style="`+ele.key.style+`">`+ele.key.name+`</span>
                        <span style="`+ele.value.style+`">`+ele.value.name+`</span>
                    </div>
                `;
              });
              descTemplate += '</div>';
          }

          template += `
              <div class="">
                <div class="custom-project-header-section" style="`+item.header.secStyle+`">
                    <div style=""><span>`+item.header.projectName+`</span></div>
                    <p style="font-weight: 400;">
                      <span>`+item.header.projectStartDate+` </span>
                      <span> - </span>
                      <span>`+item.header.projectEndDate+`</span>
                    </p>
                    <p style="font-weight: 400;">
                      <span><em>`+item.header.companyName+`</em></span>
                    </p>
                    <div style="font-weight: 400;">
                      <span>`+descTemplate+`</span>
                    </div>
                </div>

                <div class=" custom-language-section" style="width: 100%;">
                  `+additionalTemplate+`
                </div>
              <div>
              <div>`+separatorTemplate+`</div>
          `;
        })

        template += '</div>';

    }

    return template;
  }

function PORTFOLIO_API_PROCESSING(request, socket){
    // console.log("===== calling portfolio api processing =====");
    let data = null;
    if(request.portfolioDatOf && request.portfolioDatOf !== ''){
         data = generic_portfolio_data.portfolio_logo_data;
    }else{
        data = portfolio_data.portfolio_logo_data;
    }
    // let data = portfolio_data.portfolio_logo_data;
    let template = '';
    if(request.apiRef === "logo_by_category"){
        let logoData = data[request.logoCategory];
        template = createProductListingContainerTemplate(logoData);
    }else if(request.apiRef === "about_me_section"){
        let sectionData = data[request.apiRef];
        template = createAboutMeSection(sectionData);
    }else if(request.apiRef === "education_section"){
        let sectionData = data[request.apiRef];
        template = createEducationSectionTemplate(sectionData);
    }else if(request.apiRef === "projects_section"){
        let sectionData = data[request.apiRef];
        template = createProjectSectionTemplate(sectionData);
    }else if(request.apiRef === "professional_experience_section"){
        let sectionData = data[request.apiRef];
        template = createProfessionalExpTemplate(sectionData);
    }else if(request.apiRef === "skillset"){
        let sectionData = data[request.apiRef];
        template = createSkillsetTemplate(sectionData);
    }else if(request.apiRef === "contact_me_section"){
        let sectionData = data[request.apiRef];
        template = createContactsMeTemplate(sectionData);
    }else if(request.apiRef === "language"){
        let sectionData = data[request.apiRef];
        template = createKnownLanguagesTemplate(sectionData);
    }

    socket.emit("response-portfolio-data", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId });

}


module.exports.PORTFOLIO_API_PROCESSING = PORTFOLIO_API_PROCESSING;
