import React from "react";
// import PropTypes from "prop-types";
import styled from 'styled-components';

const ProjectPreview = (props) => {
  console.log({ props });

  return (
    <Wrapper>
      <p>Test to see if this works</p>
      {/* <AboutPageTemplate
      page={{
        frontmatter: entry.getIn(["data"]).toJS(),
        html: entry.getIn(["data", "body"]),
        bodyIsMarkdown: true,
      }}
    /> */}
    </Wrapper>
  );
};

ProjectPreview.propTypes = {
  // entry: PropTypes.shape({
  //   getIn: PropTypes.func,
  // }),
  // entry: PropTypes.any,
  // widgetFor: PropTypes.func,
};

export default ProjectPreview;

const Wrapper = styled.div``;


// return h('div', {},
//       // Here we provide a simple mapping function that will be applied to each
//       // object in the array of authors
//       this.props.widgetsFor('slides').map((slide, index) => {
//         var bg = slide.getIn(['data', 'image']);
//         return h('div', {key: index},
//           h('hr', {}),
//           h('img', {src: bg.toString()}),
//           h('strong', {}, slide.getIn(['data', 'description'])),
//           slide.getIn(['widgets', 'description'])
//         );
//       })
//     );
