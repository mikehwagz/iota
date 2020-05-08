// import PropTypes from 'prop-types'
// import React from 'react'
// import { FormBuilderInput, withDocument } from 'part:@sanity/form-builder'

// const defaultCondition = () => true

// class ConditionalField extends React.Component {
//   static propTypes = {
//     type: PropTypes.shape({
//       title: PropTypes.string,
//       options: PropTypes.shape({
//         condition: PropTypes.func.isRequired,
//       }).isRequired,
//     }).isRequired,
//     level: PropTypes.number,
//     focusPath: PropTypes.array,
//     onFocus: PropTypes.func.isRequired,
//     onChange: PropTypes.func.isRequired,
//     onBlur: PropTypes.func.isRequired,
//   }

//   _inputElement = React.createRef()

//   focus() {
//     if (this._inputElement.current) {
//       this._inputElement.current.focus()
//     }
//   }

//   render() {
//     const {
//       document,
//       value,
//       level,
//       focusPath,
//       onFocus,
//       onBlur,
//       onChange,
//     } = this.props

//     const { inputComponent, ...type } = this.props.type
//     const condition =
//       (type.options && type.options.condition) || defaultCondition

//     return condition(document) ? (
//       <div style={{ marginBottom: 20 }}>
//         <FormBuilderInput
//           level={level}
//           ref={this._inputElement}
//           type={type}
//           value={value}
//           onChange={onChange}
//           path={[]}
//           focusPath={focusPath}
//           onFocus={onFocus}
//           onBlur={onBlur}
//         />
//       </div>
//     ) : null
//   }
// }

// export default withDocument(ConditionalField)

import PropTypes from 'prop-types'
import React from 'react'
import {
  FormBuilderInput,
  withDocument,
  withValuePath,
} from 'part:@sanity/form-builder'

class ConditionalField extends React.Component {
  // Declare shape of React properties
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.shape({
        condition: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    level: PropTypes.number,
    focusPath: PropTypes.array,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }
  // Reference to input element
  _inputElement = React.createRef()
  // Called by the Sanity form-builder when this input should receive focus
  focus() {
    if (this._inputElement.current) {
      this._inputElement.current.focus()
    }
  }
  // Renders the form input if condition function returns true
  render() {
    const {
      document,
      getValuePath,
      value,
      level,
      focusPath,
      onFocus,
      onBlur,
      onChange,
    } = this.props
    // Extract type without 'inputComponent' (self reference) to avoid infinite loop
    const { inputComponent, ...type } = this.props.type
    // Path to parent object within document as an array of property identifiers
    const parentPath = getValuePath().slice(0, -1) // <- Remove current field from path
    // Drill into the document to find the active field's parent object,
    // e.g. the document root, an inlined object in an array or similer
    const parent = parentPath.reduce((obj, prop) => {
      return prop && prop._key
        ? obj.find((e) => e._key == prop._key) // <- Array element, look up using '_key'
        : obj[prop] // <- Normal property
    }, document)
    // Condition to evaluate if component should be shown, defaults to true
    const defaultCondition = () => false
    const condition =
      (type.options && type.options.condition) || defaultCondition
    if (!condition(document, parent)) {
      // Hide component
      return null
    } else {
      // Show component
      return (
        <div style={{ marginBottom: 20 }}>
          <FormBuilderInput
            level={level}
            ref={this._inputElement}
            type={type}
            value={value}
            onChange={onChange}
            path={[]}
            focusPath={focusPath}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      )
    }
  }
}
export default withValuePath(withDocument(ConditionalField))
