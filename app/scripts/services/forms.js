//---------------------------------------------------------------------------
//-- Forms managment
//---------------------------------------------------------------------------
'use strict';

//-- Disable the jshint Warning: "xxxx defined but never used"
/* jshint unused:false */

angular.module('icestudio')
  .service('forms', 
    function (
      gettextCatalog,
      common,
      utils2
    ) 
{

  //-------------------------------------------------------------------------
  //-- Constant for working with HTML FORMS
  //-------------------------------------------------------------------------
  //-- Each input Form has diffefrent Fields:
  //--  * Text : For entering texts (Ex. port names)
  //--  * Checkbox: on/off (Ex. FPGA pin/ virtual pin)
  //--  * Combobox. Multiple selection. (Ex. Address format )
  //--  * Color selection dropmenu
  const FIELD_TEXT = 'text';
  const FIELD_CHECKBOX = 'checkbox';
  const FIELD_COLOR = 'color-dropdown';

  //-- Constants for the Field Parameters
  const PARAM_TEXT = "%TEXT%";
  const PARAM_ID = "%ID%";
  const PARAM_VALUE = "%VALUE%";
  const PARAM_LABEL = "%LABEL%";
  const PARAM_OPTIONS = "%OPTIONS%";
  const PARAM_SELECTED = "%SELECTED%";
  const PARAM_COLOR = "%COLOR%";
  const PARAM_COLOR_NAME = "%COLOR_NAME%";

  //------------------------ HTML TEMPLATES for the Fields

  //-- Input text
  const FORM_TEXT_TEMPLATE = `
  <p> ${PARAM_TEXT} </p>
  <input class="ajs-input" 
         type="text" 
         id="form${PARAM_ID}" 
         value="${PARAM_VALUE}"
         autocomplete="off"/>
  `;

  //-- Checkbox
  const FORM_CHECKBOX_TEMPLATE = `
  <div class="checkbox">
    <label>
      <input type="checkbox" ${PARAM_VALUE} id="form${PARAM_ID}"/>
      ${PARAM_LABEL}
    </label>
  </div>
 `;

  function getColorName(color) {
    switch(color) {
      case "fuchsia": 
        return gettextCatalog.getString('Fuchsia');

      case "indianred":
        return gettextCatalog.getString('Indian Red');

      case "red":
        return gettextCatalog.getString('Red');

      case "deeppink":
        return gettextCatalog.getString('Deep Pink');

      case "mediumvioletred":
        return gettextCatalog.getString('Medium Violet Red');

      case "coral":
        return gettextCatalog.getString('Coral');
      
      case "orangered":
        return gettextCatalog.getString('Orange Red');

      case "darkorange":
        return gettextCatalog.getString('Dark Orange');

      case "gold":
        return gettextCatalog.getString('Gold');

      case "yellow":
        return gettextCatalog.getString('Yellow');

      case "slateblue":
        return gettextCatalog.getString('Slate Blue');

      case "greenyellow":
        return gettextCatalog.getString('Green Yellow');

      case "springgreen":
        return gettextCatalog.getString('Spring Green');

      case "darkgreen":
        return gettextCatalog.getString('Dark Green');
      
      case "olivedrab":
        return gettextCatalog.getString('Olive Drab');

      case "lightseagreen":
        return gettextCatalog.getString('Light Sea Green');

      case "turquoise":
        return gettextCatalog.getString('Turquoise');

      case "steelblue":
        return gettextCatalog.getString('Steel Blue');

      case "deepskyblue":
        return gettextCatalog.getString('Deep Sky Blue');

      case "royalblue":
        return gettextCatalog.getString('Royal Blue');

      case "navy":
        return gettextCatalog.getString('Navy');

      case "lightgray":
        return gettextCatalog.getString('Light Gray');

    }
  }

  //-- Dictionary with the colors
  const COLOR_NAME = {
    "fuchsia": gettextCatalog.getString('Fuchsia'),
    "indianred": gettextCatalog.getString('Indian Red'),
    "red": gettextCatalog.getString('Red'),
    "deeppink": gettextCatalog.getString('DeepPink'),
    "mediumvioletred": gettextCatalog.getString('MediumVioletRed'),
    "coral": gettextCatalog.getString('Coral'),
    "orangered": gettextCatalog.getString('OrangeRed'),
    "darkorange": gettextCatalog.getString('DarkOrange'),
    "gold": gettextCatalog.getString('Gold'),
    "yellow": gettextCatalog.getString('Yellow'),
    "slateblue": gettextCatalog.getString('SlateBlue'),
    "greenyellow": gettextCatalog.getString('GreenYellow'),
    "springgreen": gettextCatalog.getString('SpringGreen'),
    "darkgreen": gettextCatalog.getString('DarkGreen'),
    "olivedrab": gettextCatalog.getString('OliveDrab'),
    "lightseagreen": gettextCatalog.getString('LightSeaGreen'),
    "turquoise": gettextCatalog.getString('Turquoise'),
    "steelblue": gettextCatalog.getString('SteelBlue'),
    "deepskyblue": gettextCatalog.getString('DeepSkyBlue'),
    "royalblue": gettextCatalog.getString('RoyalBlue'),
    "navy": gettextCatalog.getString('Navy'),
    "lightgray": gettextCatalog.getString('LightGray'),
  };


  function getColorInputHtmlTemplate() {
    return `
      <div class="form-group">
        <label style ="font-weight:normal"> ${PARAM_LABEL} </label>
        <div class="lb-color--dropdown">
          <div class="lb-dropdown-title">
    
            <!-- The current color is the one found in spec.color -->
            <span class="lb-selected-color color-${PARAM_COLOR}"
              data-color="${PARAM_COLOR}"
              data-name="${PARAM_COLOR_NAME}"> 
            </span> 
            ${PARAM_COLOR_NAME}
            <span class="lb-dropdown-icon"></span>
          </div>
        
          <div class="lb-dropdown-menu">
    
          <div class="lb-dropdown-option" 
            data-color="indianred" 
            data-name="${getColorName("indianred")}">
              <span class="lb-option-color color-indianred">
              </span>
              ${getColorName("indianred")}
          </div>
          
          <div class="lb-dropdown-option" 
            data-color="red" 
            data-name="${getColorName("red")}">
              <span class="lb-option-color color-red">
              </span>
              ${getColorName("red")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="deeppink" 
            data-name="${getColorName("deeppink")}">
              <span class="lb-option-color color-deeppink">
              </span>
              ${getColorName("deeppink")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="mediumvioletred"
            data-name="${getColorName("mediumvioletred")}">
              <span class="lb-option-color color-mediumvioletred">
              </span>
              ${getColorName("mediumvioletred")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="coral"
            data-name="${getColorName("coral")}">
              <span class="lb-option-color color-coral"></span>
              ${getColorName("coral")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="orangered"
            data-name="${getColorName("orangered")}">
              <span class="lb-option-color color-orangered"></span>
              ${getColorName("orangered")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="darkorange"
            data-name="${getColorName("darkorange")}">
              <span class="lb-option-color color-darkorange"></span>
              ${getColorName("darkorange")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="gold"
            data-name="${getColorName("gold")}">
              <span class="lb-option-color color-gold"></span>
              ${getColorName("gold")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="yellow"
            data-name="${getColorName("yellow")}">
              <span class="lb-option-color color-yellow"></span>
              ${getColorName("yellow")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="fuchsia"
            data-name=" ${getColorName("fuchsia")}">
              <span class="lb-option-color color-fuchsia"></span>
              ${getColorName("fuchsia")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="slateblue"
            data-name="${getColorName("slateblue")}">
              <span class="lb-option-color color-slateblue"></span>
              ${getColorName("slateblue")}
          </div>
          <div class="lb-dropdown-option" 
            data-color="greenyellow"
            data-name="${getColorName("greenyellow")}">
              <span class="lb-option-color color-greenyellow"></span>
              ${getColorName("greenyellow")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="springgreen"
            data-name="${getColorName("springgreen")}">
              <span class="lb-option-color color-springgreen"></span>
              ${getColorName("springgreen")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="darkgreen"
            data-name="${getColorName("darkgreen")}">
              <span class="lb-option-color color-darkgreen"></span>
              ${getColorName("darkgreen")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="olivedrab"
            data-name="${getColorName("olivedrab")}">
              <span class="lb-option-color color-olivedrab">
              </span>
              ${getColorName("olivedrab")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="lightseagreen" 
            data-name="${getColorName("lightseagreen")}">
              <span class="lb-option-color color-lightseagreen"></span>
              ${getColorName("lightseagreen")}
          </div> 
    
          <div class="lb-dropdown-option" 
            data-color="turquoise"
            data-name="${getColorName("turquioise")}">
              <span class="lb-option-color color-turquoise"></span>
              ${getColorName("turquoise")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="steelblue"
            data-name="${getColorName("steelblue")}">
              <span class="lb-option-color color-steelblue"></span>
              ${getColorName("steelblue")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="deepskyblue"
            data-name="${getColorName("deepskyblue")}">
              <span class="lb-option-color color-deepskyblue"></span>
              ${getColorName("deepskyblue")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="royalblue"
            data-name="${getColorName("royalblue")}">
              <span class="lb-option-color color-royalblue"></span>
              ${getColorName("royalblue")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="navy"
            data-name="${getColorName("navy")}">
              <span class="lb-option-color color-navy"></span>
              ${getColorName("navy")}
          </div>
    
          <div class="lb-dropdown-option" 
            data-color="lightgray"
            data-name="${getColorName("lightgray")}">
              <span class="lb-option-color color-lightgray"></span>
              ${getColorName("lightgray")}
          </div>
          
          </div>
        </div>
      </div>
    `;
  }

   //-- HTML template for the color dropdown input
   const FORM_COLOR_INPUT_TEMPLATE = `
   <div class="form-group">
      <label style ="font-weight:normal"> ${PARAM_LABEL} </label>
      <div class="lb-color--dropdown">
        <div class="lb-dropdown-title">
 
          <!-- The current color is the one found in spec.color -->
          <span class="lb-selected-color color-${PARAM_COLOR}"
            data-color="${PARAM_COLOR}"
            data-name="${PARAM_COLOR_NAME}"> 
          </span> 
          ${PARAM_COLOR_NAME}
          <span class="lb-dropdown-icon"></span>
        </div>
      
        <div class="lb-dropdown-menu">
 
        <div class="lb-dropdown-option" 
          data-color="indianred" 
          data-name="${COLOR_NAME["indianred"]}">
            <span class="lb-option-color color-indianred">
            </span>
            ${COLOR_NAME["indianred"]}
        </div>
        
        <div class="lb-dropdown-option" 
          data-color="red" 
          data-name="${COLOR_NAME["red"]}">
            <span class="lb-option-color color-red">
            </span>
            ${COLOR_NAME["red"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="deeppink" 
          data-name="${COLOR_NAME["deeppink"]}">
            <span class="lb-option-color color-deeppink">
            </span>
            ${COLOR_NAME["deeppink"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="mediumvioletred"
          data-name="${COLOR_NAME["mediumvioletred"]}">
            <span class="lb-option-color color-mediumvioletred">
            </span>
            ${COLOR_NAME["mediumvioletred"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="coral"
          data-name="${COLOR_NAME["mediumvioletred"]}">
            <span class="lb-option-color color-coral"></span>
            ${COLOR_NAME["mediumvioletred"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="orangered"
          data-name="${COLOR_NAME["orangered"]}">
            <span class="lb-option-color color-orangered"></span>
            ${COLOR_NAME["orangered"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="darkorange"
          data-name="${COLOR_NAME["darkorange"]}">
            <span class="lb-option-color color-darkorange"></span>
            ${COLOR_NAME["darkorange"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="gold"
          data-name="${COLOR_NAME["gold"]}">
            <span class="lb-option-color color-gold"></span>
            ${COLOR_NAME["gold"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="yellow"
          data-name="${COLOR_NAME["yellow"]}">
            <span class="lb-option-color color-yellow"></span>
            ${COLOR_NAME["yellow"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="fuchsia"
          data-name="${COLOR_NAME["fuchsia"]}">
            <span class="lb-option-color color-fuchsia"></span>
            ${getColorName("fuchsia")}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="slateblue"
          data-name="${COLOR_NAME["slateblue"]}">
            <span class="lb-option-color color-slateblue"></span>
            ${COLOR_NAME["slateblue"]}
        </div>
        <div class="lb-dropdown-option" 
          data-color="greenyellow"
          data-name="${COLOR_NAME["greenyellow"]}">
            <span class="lb-option-color color-greenyellow"></span>
            ${COLOR_NAME["greenyellow"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="springgreen"
          data-name="${COLOR_NAME["springgreen"]}">
            <span class="lb-option-color color-springgreen"></span>
            ${COLOR_NAME["springgreen"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="darkgreen"
          data-name="${COLOR_NAME["darkgreen"]}">
            <span class="lb-option-color color-darkgreen"></span>
            ${COLOR_NAME["darkgreen"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="olivedrab"
          data-name="${COLOR_NAME["olivedrab"]}">
            <span class="lb-option-color color-olivedrab">
            </span>
            ${COLOR_NAME["olivedrab"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="lightseagreen" 
          data-name="${COLOR_NAME["lightseagreen"]}">
            <span class="lb-option-color color-lightseagreen"></span>
            ${COLOR_NAME["lightseagreen"]}
        </div> 
 
        <div class="lb-dropdown-option" 
          data-color="turquoise"
          data-name="${COLOR_NAME["turquoise"]}">
            <span class="lb-option-color color-turquoise"></span>
            ${COLOR_NAME["turquoise"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="steelblue"
          data-name="${COLOR_NAME["steelblue"]}">
            <span class="lb-option-color color-steelblue"></span>
            ${COLOR_NAME["steelblue"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="deepskyblue"
          data-name="${COLOR_NAME["deepskyblue"]}">
            <span class="lb-option-color color-deepskyblue"></span>
            ${COLOR_NAME["deepskyblue"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="royalblue"
          data-name="${COLOR_NAME["royalblue"]}">
            <span class="lb-option-color color-royalblue"></span>
            ${COLOR_NAME["royalblue"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="navy"
          data-name="${COLOR_NAME["navy"]}">
            <span class="lb-option-color color-navy"></span>
            ${COLOR_NAME["navy"]}
        </div>
 
        <div class="lb-dropdown-option" 
          data-color="lightgray"
          data-name="${COLOR_NAME["lightgray"]}">
            <span class="lb-option-color color-lightgray"></span>
            ${COLOR_NAME["lightgray"]}
        </div>
        
       </div>
     </div>
   </div>
 `;

  //---------------------------------------------------------
  //-- TEXTFIELD. It represents a Form Input text field
  //---------------------------------------------------------
  //-- This is how it is rendered in the Form
  /*
         text message
        +-----------------+
        | Input text      |
        +-----------------+ 
   
  */
  class TextField {

    //-----------------------------------------------------------------------
    //-- Input parameters:
    //--   * Label: Text place above the input box
    //--   * value: Default value
    //--   * formId: Form identification number
    //-----------------------------------------------------------------------
    constructor(label, value, formId) {

      this.type = FIELD_TEXT;
      this.label = label;
      this.value = value;
      this.formId = formId;
    }

    //---------------------------------------------------------
    //-- Return a string whith the HTML code for this field
    //---------------------------------------------------------
    html() {

      //-- Generate the HTML code

      //-- Insert the parameters in the html code template
      let html = FORM_TEXT_TEMPLATE.replace(PARAM_TEXT, this.label);
      html = html.replace(PARAM_VALUE, this.value);
      html = html.replace(PARAM_ID, this.formId);

      return html;
    }

    //---------------------------------------------
    //-- Read the Field value
    //---------------------------------------------
    read() {

      //-- Read the value from the DOM
      let value = $(`#form${this.formId}`).val();

      return value;
    }

  }

  //-------------------------------------------------------------------------
  //--- CHECKBOX FIELD. Input checkbox field
  //-------------------------------------------------------------------------
    //-- This is how it is rendered in the Form
  /*
         [ ] Label
  */
  class CheckboxField {

    //-----------------------------------------------------------------------
    //-- Input parameters:
    //--   * Label: Text place to the right of the checkbox
    //--   * value: Default value
    //--   * formId: Form identification number
    //-----------------------------------------------------------------------
    constructor(label, value, formId) {

      this.type = FIELD_CHECKBOX;
      this.label = label;
      this.value = value;
      this.formId = formId;
    }

    //---------------------------------------------------------
    //-- Return a string whith the HTML code for this field
    //---------------------------------------------------------
    html() {
      //-- Generate the HTML code

      //-- Insert the parameters in the html code template
      let html = FORM_CHECKBOX_TEMPLATE.replace(
        PARAM_VALUE,
        (this.value ? 'checked' : ''));

      html = html.replace(PARAM_ID, this.formId);
      html = html.replace(PARAM_LABEL, this.label);

      return html;
    }

    //---------------------------------------------
    //-- Read the Field value
    //---------------------------------------------
    read() {

      //-- Read the value from the form i
      let value = $($('#form' + this.formId).prop('checked'));
      value = value[0] || false;

      return value;
    }
    
  }

  //-------------------------------------------------------------------------
  //--- COLOR FIELD. Input color dropdown field
  //-------------------------------------------------------------------------
  /*
        Label
        +-----------------+
        | o Color       v |
        +-----------------+  
  */

  class ColorField {
    //-----------------------------------------------------------------------
    //-- Create the html code for an input color dropdown field
    //-- INPUTS:
    //--   * Label: Text place above the color input box
    //--   * color: Color value (String)
    //--   * colorName: Color name (String)
    //--
    //-- Returns:
    //--   -A string with the HTML code for that Field
    //-----------------------------------------------------------------------
    constructor(label, color) {
      this.type = FIELD_COLOR;
      this.label = label;
      this.color = color;
      this.colorName = getColorName(color);
    }
    
     //---------------------------------------------------------
    //-- Return a string whith the HTML code for this field
    //---------------------------------------------------------
    html() {
      //-- Generate the HTML code

      //-- Get the html template
      let html = getColorInputHtmlTemplate();


      //-- Insert the parameters in the html code template
      html = html.replace(
        PARAM_LABEL,
        this.label
      );

      html = html.replaceAll(PARAM_COLOR, this.color);
      html = html.replaceAll(PARAM_COLOR_NAME, this.colorName);

      return html;
    }

    //---------------------------------------------
    //-- Read the Field value
    //---------------------------------------------
    read() {

      //-- Read the value 
      let value = $('.lb-selected-color').data('color');            

      return value;
    }

  }




  //-------------------------------------------------------------------------
  //--- Input combobox field
  //-------------------------------------------------------------------------
   /*
         Label
        +-----------------+
        | Option        v |
        +-----------------+  
  */

  //-- HTML code template
  //-- Ex. <option value="10" selected>Decimal</option>
  const COMBOBOX_OPTION_TEMPLATE=`
    <option value="${PARAM_VALUE}" ${PARAM_SELECTED}>
      ${PARAM_LABEL}
    </option>
  `;

  //-- HTML template for the combobox input
  const FORM_COMBOBOX_TEMPLATE = `
  <div class="form-group">
    <label style="font-weight:normal">${PARAM_LABEL}</label>
    <select class="form-control" id="form${PARAM_ID}">
      ${PARAM_OPTIONS}
    </select>
  </div>
`;

  //----------------------------------------------------
  //-- create the html code for the option tag
  //-- INPUTS:
  //--   * value: Value for the option
  //--   * selected: If this option is de default
  //--   * label: Text assigned to the option
  //--
  //--  Returns:
  //--    -A string with the HTML code
  //----------------------------------------------------
  this.htmlComboboxOption = function(value, selected, label) {

    //-- Insert the parameters in the html TEMPLATE
    let html = COMBOBOX_OPTION_TEMPLATE.replace(PARAM_VALUE, value);
    html = html.replace(PARAM_SELECTED, selected);
    html = html.replace(PARAM_LABEL, label);

    return html;
  };

  //-------------------------------------------------------------------------
  //-- create the html code for a Combobox input Field
  //-- INPUTS:
  //--   * options: Array of options. Each option have the attributes:
  //--        -value
  //--        -label
  //--   * value: Default Value for the option
  //--   * selected: If this option is the default
  //--   * label: Text assigned to the option
  //--
  //--  Returns:
  //--    -A string with the HTML code
  //-------------------------------------------------------------------------
  this.htmlInputCombobox = function(options, label, value, formId) {

    //-- Array with the html code generated by the options
    let opts = [];

    //-- Apply to every option in the combobox
    options.forEach( (op) => {
  
      //-- Is this option selected by default?
      let selected = (value === op.value) ? 'selected' : '';
  
      //-- Generate the html code for that option
      let html = this.htmlComboboxOption(op.value, selected, op.label);
  
      //-- Store in the array
      opts.push(html);
    });

    //-- Join all the option into a single string
    opts = opts.join('');

    //-- Insert the parameters in the Combox HTML template
    let html = FORM_COMBOBOX_TEMPLATE.replace(PARAM_LABEL, label);
    html = html.replace(PARAM_ID, formId);
    html = html.replace(PARAM_OPTIONS, opts);
    
    return(html);
  };

  


  
  class Form {

    //-- Build a blank form
    constructor() {

      //-- Array of fields
      this.fields = [];
    }

    //------------------------------------------------------
    //-- Parse the block names. The spaces are removed  
    //-- and the individual names obtained (if they are
    //-- separated by comas)
    //--
    //-- INPUT: 
    //--   * value: String introduced by the user
    //-- Returns:
    //--   An array of string with the names of the ports
    //------------------------------------------------------
    //-- Example: If the user enters " a, b, c[1:0]",
    //-- It returns: ["a", "b", "c[1:0]"]
    //------------------------------------------------------
    static parseNames(names) {
  
      //-- First: remove the initial and ending spaces, if any
      let text = names.trim();
  
      //-- Second: Remove the spaces around the commas (,) 
      text = text.replace(/\s*,\s*/g, ',');
  
      //-- Third: Get the Input block names as a list of strings
      let finalNames = text.split(',');
  
      //-- Return an array with the names
      return finalNames;
    }   

    //---------------------------------------------------
    //-- Parse the Port names
    //-- 
    //-- INPUT:
    //--   * name: String (Ex: "a[7:0]")
    //--
    //-- Returns:
    //--   * null: No match (Syntax error)
    //--   * PortInfo structure:
    //--      -name: Port name (Ex. "a")
    //--      -rangstr: Range string (Ex. "[7:0]")
    //--      -size: Port size
    //----------------------------------------------------
    static parsePortName(portName) {

      //-- Pattern for partsin the port names
      let pattern = common.PATTERN_PORT_LABEL;

      //-- Parse the name
      let match = pattern.exec(portName);

      //-- match[0]: global match
      //-- match[1]: Initial word: name
      //-- match[2]: Range (Ex. [7:0])
      //-- match[3]: Most significant byte in the range (Ex. 7)
      //-- match[4]: Less significant byte in the range (Ex. 0)

      if (match) {

        //--There is a full match
        if (match[0] === match.input) {

          //-- Return object
          let portInfo = {};

          //-- Get the name and rangestr
          portInfo.name = match[1] || '';
          portInfo.rangestr = match[2];

          //-- Let's calculate the size

          //-- If it is a bus...
          if (portInfo.rangestr) {

            //-- Get the range left and right numbers
            let left = parseInt(match[3]);
            let right = parseInt(match[4]);

            portInfo.size = Math.abs(left - right) + 1;
          }
          //-- It is an isolated wire
          else {
            portInfo.size = 1;
          }

          //-- No more checkings....
          //-- TODO: Size checking
          return portInfo;
        }

      }
      //-- No match
      return null;

    } 

    //------------------------------------
    //-- Add a field to the form
    //------------------------------------
    addField(field) {
      this.fields.push(field);
    }

    //------------------------------------------------------------------
    //-- Read all the inputs from the fields introduced by the user
    //-- Returns: An array of values
    //------------------------------------------------------------------
    readFields() {

      //-- Array were the values will be stored 
      let values = [];

      //-- Read the values from the Form fields
      //-- and insert them into the values array
      this.fields.forEach( field => {

        //-- Read the value from the field
        let value = field.read(); 

        //-- Add the value to the array
        values.push(value);

      });

      //-- Return all the values
      return values;
    }


    //-------------------------------------
    //-- Generate the HTML of the form
    //-------------------------------------
    html() {

      //-- Variable for storing the html code
      let formHtml = [];

      //-- Variable for storing the field HTML code
      let fieldHtml;

      //-- Initial tag for the Form
      formHtml.push('<div>');

      //-- Generate the html for all the fields in the form
      this.fields.forEach( field => {

        //-- Create the html code
        fieldHtml = field.html();

        //-- Store the html for this Field
        formHtml.push(fieldHtml);

      });

      //-- Closing tag for the Form
      formHtml.push('</div>');

      //-- Create the string
      let html = formHtml.join('\n');

      //-- return the HTML code
      return html;

    }

    //-----------------------------------------------------------------
    //-- Display the Form
    //-- INPUT:
    //--   * callback: Function called when the OK button is pressed
    //-----------------------------------------------------------------
    display(callback) {

      //-- Create the HTML
      let html = this.html();

      //-- Display the Form
      alertify.confirm(html)

        //-- Set the callback for the OK button
        .set('onok', callback )

        //-- Set the callback for the Candel button:
        //--   Do nothing... 
        .set('oncancel', function ( /*evt*/) { });

    }

  }

  //-------------------------------------------------------------
  //-- Class for modeling the Forms for the Input and Output
  //--    ports. All their common stuff is place here
  //-------------------------------------------------------------
  class FormBasicPort extends Form {

    //--------------------------------------------------
    //-- INPUTS:
    //--   * msg: Message above the text box
    //--   * name: Default port name
    //--   * virtual: Is this a virtual or real port?
    //--------------------------------------------------
    constructor(msg, name = '', virtual=false) {

      //-- Create a blank Form (calling the upper Class)
      super();

      //-------- Add the diffent Fields:
      //-- Field 0: Text input
      let field0 = new TextField(
        msg,     //-- Top message
        name,   //-- Default value
        0        //-- Field id
      );

      //-- Field 1: Checkbox for selecting if the input block
      //-- is an FPGA pin or an internal port
      let field1 = new CheckboxField(
        gettextCatalog.getString('FPGA pin'),
        !virtual,  //-- Default value
        1         //-- Field id
      );

      //-- Add the fields to the form
      this.addField(field0);
      this.addField(field1);

      //-- Control the notifications generated by 
      //-- the errors when processing the form
      this.resultAlert = null;
    }

    //-------------------------------------------------------
    //-- Analize the values introduce by the user and
    //-- store them as properties
    //-------------------------------------------------------
    parseFields() {
      //-- Read the values from the form
      this.values = this.readFields();

      //-- Values[0]: Input pin names
      //-- Parse the input names
      this.names = Form.parseNames(this.values[0]);

      //-- Values[1] indicates if it is a virtual pin or not
      this.virtual = !this.values[1];
    }

    //-----------------------------------------------------------------------
    //-- Get the Information of the port(s): name, range, size...
    //-- and store it in the portInfo property
    //--
    //-- ERRORs are check and Notifications raised in case of errors
    //------------------------------------------------------------------------
    getPortInfo(evt) {

      let portInfo;
      this.portInfos = [];

      //-- Check all the ports (The user may have include one or more)
      for (let name of this.names) {

        //-- Get the port Info: port name, size...
        portInfo = Form.parsePortName(name);

        //-- No portInfo... The was a syntax error
        if (!portInfo) {
          //-- Do not close the form
          evt.cancel = true;

          //-- Show a warning notification
          this.resultAlert = alertify.warning(
              gettextCatalog.getString('Wrong block name {{name}}', 
                                      { name: name }));
          return;
        }

        //-- TODO: Check sizes

        //-- Store the current portInfo
        this.portInfos.push(portInfo);
      }

      //-- Close the form when finish
      evt.cancel = false;

    }

    //------------------------------------------------
    //-- Process the information enter by the user
    //------------------------------------------------
    process(evt) {

      //-- If there was a previous notification, dismiss it
      if (this.resultAlert) {
        this.resultAlert.dismiss(false);
      }

      //-- Parse the Fields
      this.parseFields();

      //-- Get the ports info and check for errors
      this.getPortInfo(evt);
    }

    

    //-------------------------------------------------------------
    //-- Create the blocks defined in the form
    //-- Call this methods only when the form has been processed!
    //-------------------------------------------------------------
    newBlocks() {

      //-- Array for storing all the blocks created
      let blocks = [];
      let block;

      for (let i in this.portInfos) {

        //-- Create the block
        block = this.newBlock(i);

        //-- Store this block in the array
        blocks.push(block);
      }

      //-- Return an array of Blocks
      return blocks;
      
    }

  }

  class FormBasicInput extends FormBasicPort {

    //-------------------------------------------------------------------------
    //-- Create the form for the INPUT PORTS
    //-------------------------------------------------------------------------
    //-- Form:
    //----------------------------------------+
    //--    Enter the input blocks            |
    //--    +--------------------------+      |
    //--    | Pin names                |      |
    //--    +--------------------------+      |
    //--                                      |
    //--    [✅️] FPGA pin                     |
    //--    [  ] Show clock                   |
    //----------------------------------------+
    //-- INPUTS:
    //--   * name: Default port name
    //--   * virtual: Is this a virtual or real port?
    //--   * Clock: The input pin carries a clock signal
    constructor(name = '', virtual=false, clock=false) {

      //-- Create a blank BasicPortForm (calling the upper Class)
      super(gettextCatalog.getString('Input port name:'),
            name,
            virtual);

      //-- Store the type of block associated with the Form
      this.type = utils2.BASIC_INPUT;

      //-------- Add the particular fields

      //-- Field 2: Checkbox for configuring the input pin
      //--          as a clock
      let field2 = new CheckboxField(
        gettextCatalog.getString('Show clock'),
        clock,  //-- Default value
        2       //-- Field id
      );

      //-- Add the fields to the form
      this.addField(field2);

      //-- Store the initial values
      //-- (For comparing it later with the new ones and detect if
      //--  there have been changes)
      this.nameIni = name;
      this.virtualIni = virtual;
      this.clockIni = clock;
    }

    //------------------------------------------------
    //-- Process the information entered by the user
    //------------------------------------------------
    process(evt) {

      //-- First, Process the form as a BasicPort
      super.process(evt);

      //-- Second: Process the particular fields

      //-- Input port have the clock property
      //-- it indicates if this is a clock input
      this.clock = this.values[2];

      //-- Check all ports again... There could be no data buses defined
      //-- as clocks (it is only for 1-wire ports)
      for (let portInfo of this.portInfos) {

        //-- Check particular errors
        //-- Error: Buses cannot be clocks...
        if (portInfo.rangestr && this.clock) {
          evt.cancel = true;

          //-- Show a notification with the warning
          this.resultAlert = alertify.warning(
              gettextCatalog.getString('Clock not allowed for data buses'));

          //-- Processing not yet finished
          return;
        }
      }

      //-- There have been no errors. Detect if there have been some
      //-- changes in the values
      this.changed = (this.nameIni !== this.values[0] || 
                      this.virtualIni !== this.virtual || 
                      this.clockIni !== this.clock); 
    }

    //-------------------------------------------------------------
    //-- Create the block define in the form
    //-- Call this method only when the form has been processed!
    //-- 
    //-- INPUTS:
    //--   * n:  Number of block to create
    //--
    //-- RETURN:
    //--   * The InputBasicPort block
    //-------------------------------------------------------------
    newBlock(n) {

      //-- Create all the blocks defined
      let portInfo = this.portInfos[n];
      
      //-- Create an array of empty pins (with name and values 
      //-- set to 'NULL')
      let pins = utils2.getPins(portInfo);

      let block = new utils2.InputPortBlock(
        portInfo.name,
        this.virtual,
        portInfo.rangestr,
        pins,
        this.clock
      );

      return block;
    }

  }


  class FormBasicOutput extends FormBasicPort {

    //-------------------------------------------------------------------------
    //-- Create the form for the OUTPUT PORTS
    //-------------------------------------------------------------------------
    //-- Form:
    //----------------------------------------+
    //--    Enter the output blocks           |
    //--    +--------------------------+      |
    //--    | Pin names                |      |
    //--    +--------------------------+      |
    //--                                      |
    //--    [✅️] FPGA pin                     |
    //----------------------------------------+
    //-- INPUTS:
    //--   * msg: Message above the text box
    //--   * name: Default port name
    //--   * virtual: Is this a virtual or real port?
    constructor(name = '', virtual=false) {

      //-- Create a blank BasicPortForm (calling the upper Class)
      super(gettextCatalog.getString('Output port name'), 
            name, 
            virtual);

      //-- Store the type of block associated with the Form
      this.type = utils2.BASIC_OUTPUT;

      //-------- Output port do not have particular fields
      //-- Store the initial values
      //-- (For comparing it later with the new ones and detect if
      //--  there have been changes)
      this.nameIni = name;
      this.virtualIni = virtual;
    }

    process(evt) {

      //-- Process the form as an BasicPort
      super.process(evt);
      
      //-- No particular processing for Output ports

      //-- There have been no errors. Detect if there have been some
      //-- changes in the values
      this.changed = (this.nameIni !== this.values[0] || 
        this.virtualIni !== this.virtual); 
    }

    //-------------------------------------------------------------
    //-- Create the block define in the form
    //-- Call this method only when the form has been processed!
    //-- 
    //-- INPUTS:
    //--   * n:  Number of block to create
    //--
    //-- RETURN:
    //--   * The OutputBasicPort block
    //-------------------------------------------------------------
    newBlock(n) {

      //-- Create all the blocks defined
      let portInfo = this.portInfos[n];
      
      //-- Create an array of empty pins (with name and values 
      //-- set to 'NULL')
      let pins = utils2.getPins(portInfo);

      //-- Create the block
      let block = new utils2.OutputPortBlock(
        portInfo.name,
        this.virtual,
        portInfo.rangestr,
        pins
      );

      //-- Return the block
      return block;
    }

  }


  //-------------------------------------------------------------
  //-- Class for modeling the Forms for the Input and Output
  //-- labels. All their common stuff is place here
  //-------------------------------------------------------------
  class FormBasicLabel extends Form {

    //-----------------------------------------------------
    //-- INPUTS:
    //--    * msg: Message above the text box
    //--    * name: Default label name
    //--    * color: Default label color
    //------------------------------------------------------
    constructor(msg, name='', color='fuchsia') {

      //-- Create a blank Form (calling the upper Class)
      super();

      //-- Add the different Fields
      //-- Field 0: Text input: label name
      let field0 = new TextField(
        msg,   //-- Top message
        name,  //-- Default value
        0      //-- Field id
      );

      //-- Field 1: Color Selector. Label color
      let field1 = new ColorField(
        gettextCatalog.getString("Choose a color:"),
        color    //-- Default color
      );

      //-- Add the fields to the form
      this.addField(field0);
      this.addField(field1);

      //-- Control the notifications generated by 
      //-- the errors when processing the form
      this.resultAlert = null;

      //-- Store the initial values
      //-- (For comparing it later with the new ones and detect if
      //--  there have been changes)
      this.nameIni = name;
      this.colorIni = color;
    }

    //-------------------------------------------------------
    //-- Analize the values introduce by the user and
    //-- store them as properties
    //-------------------------------------------------------
    parseFields() {
      //-- Read the values from the form
      this.values = this.readFields();

      //-- Values[0]: Label names
      //-- Parse the names
      this.names = Form.parseNames(this.values[0]);

      //-- Values[1]: Label color
      this.color = this.values[1];
    }

    //-----------------------------------------------------------------------
    //-- Get the Information of the port(s): name, range, size...
    //-- and store it in the portInfo property
    //--
    //-- ERRORs are check and Notifications raised in case of errors
    //------------------------------------------------------------------------
    getPortInfo(evt) {

      let portInfo;
      this.portInfos = [];

      //-- Check all the ports (The user may have include one or more)
      for (let name of this.names) {

        //-- Get the port Info: port name, size...
        portInfo = Form.parsePortName(name);

        //-- No portInfo... The was a syntax error
        if (!portInfo) {
          //-- Do not close the form
          evt.cancel = true;

          //-- Show a warning notification
          this.resultAlert = alertify.warning(
              gettextCatalog.getString('Wrong block name {{name}}', 
                                      { name: name }));
          return;
        }

        //-- TODO: Check sizes

        //-- Store the current portInfo
        this.portInfos.push(portInfo);
      }

      //-- Close the form when finish
      evt.cancel = false;

    }

    //------------------------------------------------
    //-- Process the information entered by the user
    //------------------------------------------------
    process(evt) {
      
      console.log("PROCESS THE FORM!!");

      //-- If there was a previous notification, dismiss it
      if (this.resultAlert) {
        this.resultAlert.dismiss(false);
      }

      //-- Parse the Fields
      this.parseFields();

      //-- Get the ports info and check for errors
      this.getPortInfo(evt);

    }

    //-------------------------------------------------------------
    //-- Create the blocks defined in the form
    //-- Call this methods only when the form has been processed!
    //-------------------------------------------------------------
    newBlocks() {

      //-- Array for storing all the blocks created
      let blocks = [];
      let block;

      for (let i in this.portInfos) {

        //-- Create the block
        block = this.newBlock(i);

        //-- Store this block in the array
        blocks.push(block);
      }

      //-- Return an array of Blocks
      return blocks;
      
    }


  }

  //-----------------------------------------------------------
  //-- Class for modeling the Forms for the Input Labels
  //-----------------------------------------------------------
  class FormBasicInputLabel extends FormBasicLabel {

    //---------------------------------------------
    //-- Create the form for the INPUT Labels
    //---------------------------------------------
    //-- Form:
    //----------------------------------------+
    //--    Enter the input label             |
    //--    +--------------------------+      |
    //--    | Label names              |      |
    //--    +--------------------------+      |
    //--                                      |
    //--    Chose a color                     |
    //--    +--------------------------+      |
    //--    | o Fucshia                |      |
    //--    +--------------------------+      |
    //--                                      |
    //----------------------------------------+
    //-- INPUTS:
    //--   * name: Default Label name
    //--   * color: Default label color
    //---------------------------------------------
    constructor(name='', color='fuchsia') {

      //-- Create a blank BasicLabelForm (calling the upper Class)
      super(
        gettextCatalog.getString('Output labels'),
        name,
        color
      );

      //-- Store the type of block associated with the Form
      this.type = utils2.BASIC_INPUT_LABEL;

      //-------- Input Label port DO NOT have particular fields
    }

    process(evt) {

      //-- Process the form as an BasicPort
      super.process(evt);
      
      //-- No particular processing for Output ports

      //-- There have been no errors. Detect if there have been some
      //-- changes in the values
      this.changed = (this.nameIni !== this.values[0] || 
        this.colorIni !== this.color); 
    }

    //-------------------------------------------------------------
    //-- Create the block define in the form
    //-- Call this method only when the form has been processed!
    //-- 
    //-- INPUTS:
    //--   * n:  Number of block to create
    //--
    //-- RETURN:
    //--   * The InputBasicPort block
    //-------------------------------------------------------------
    newBlock(n) {

      //-- Get the info of the label n
      let portInfo = this.portInfos[n];

      //-- Create the Label block
      let block = new utils2.InputLabelBlock(
        portInfo.name,
        portInfo.rangestr,
        this.color
      );

      return block;
    }

  }

  class FormBasicOutputLabel extends FormBasicLabel {
    //---------------------------------------------
    //-- Create the form for the OUTPUT Labels
    //---------------------------------------------
    //-- Form:
    //----------------------------------------+
    //--    Enter the input label             |
    //--    +--------------------------+      |
    //--    | Label names              |      |
    //--    +--------------------------+      |
    //--                                      |
    //--    Chose a color                     |
    //--    +--------------------------+      |
    //--    | o Fucshia                |      |
    //--    +--------------------------+      |
    //--                                      |
    //----------------------------------------+
    //-- INPUTS:
    //--   * name: Default Label name
    //--   * color: Default label color
    //---------------------------------------------
    constructor(name='', color='fuchsia') {

      //-- Create a blank BasicLabelForm (calling the upper Class)
      super(
        gettextCatalog.getString('Input labels'),
        name,
        color
      );

      //-- Store the type of block associated with the Form
      this.type = utils2.BASIC_OUTPUT_LABEL;

      //-------- Output Label port do not have particular fields
    }

    process(evt) {

      //-- Process the form as an BasicPort
      super.process(evt);
      
      //-- No particular processing for Output ports

      //-- There have been no errors. Detect if there have been some
      //-- changes in the values
      this.changed = (this.nameIni !== this.values[0] || 
        this.colorIni !== this.color); 
    }

    //-------------------------------------------------------------
    //-- Create the block define in the form
    //-- Call this method only when the form has been processed!
    //-- 
    //-- INPUTS:
    //--   * n:  Number of block to create
    //--
    //-- RETURN:
    //--   * The InputBasicPort block
    //-------------------------------------------------------------
    newBlock(n) {

      //-- Get the info of the label n
      let portInfo = this.portInfos[n];

      //-- Create the Label block
      let block = new utils2.OutputLabelBlock(
        portInfo.name,
        portInfo.rangestr,
        this.color
      );

      return block;
    }
  }



  class FormBasicPairedLabels extends FormBasicLabel {
    constructor(name='', color='fuchsia') {

      //-- Create a blank BasicLabelForm (calling the upper Class)
      super(
        gettextCatalog.getString('Name of the paired labels'),
        name,
        color
      );

      //-- Store the type of block associated with the Form
      this.type = utils2.BASIC_PAIRED_LABEL;
    }

    //-------------------------------------------------------------
    //-- Create the block define in the form
    //-- Call this method only when the form has been processed!
    //-- 
    //-- INPUTS:
    //--   * n:  Number of block to create
    //--
    //-- RETURN:
    //--   * The InputBasicPort block
    //-------------------------------------------------------------
    newBlock(n) {

      //-- Get the info of the label n
      let portInfo = this.portInfos[n];

      //-- Create the Paired labels: Input
      let block1 = new utils2.InputLabelBlock(
        portInfo.name,
        portInfo.rangestr,
        this.color
      ); 

      //-- Create the Paired labels: Output
      let block2 = new utils2.OutputLabelBlock(
        portInfo.name,
        portInfo.rangestr,
        this.color
      );

      //-- Array with the paired labels
      let pairedLabels = [block1, block2];

      //-- Return the array of paired labels
      return pairedLabels;
    }
  }

  //-------------------------------------------------------------------------
  //-- CLASS: Creating/Editing a Basic Code block
  //-------------------------------------------------------------------------
  class FormBasicCode extends Form {

    //-----------------------------------------------------------------
    //-- INPUTS:
    //--   * portsIn: Input port names (separated by commas)
    //--   * portsOut: Output port names (separated by commas)
    //--   * paramsIn: Input parameters names (separataed by commas)
    //-----------------------------------------------------------------
    constructor(portsIn='', portsOut='', paramsIn='') {

      //-- Create a blank Form (calling the upper Class)
      super();

      //--- Add the different Fields:

      //-- Field 0: Input port names
      let field0 = new TextField(
        gettextCatalog.getString('Input ports'), //-- Top message
        portsIn,   //-- Default Input port names
        0          //-- Field id
      );

      //-- Field 1: Output port names
      let field1 = new TextField(
        gettextCatalog.getString('Output ports'), //-- Top message
        portsOut,  //-- Default Output port names
        1          //-- Field id
      );

      //-- Field 2: Input params
      let field2 = new TextField(
        gettextCatalog.getString('Input parameters'), //-- Top message
        paramsIn,   //-- Default Input parameter names
        2
      );

      //-- Add the fields to the form
      this.addField(field0);
      this.addField(field1);
      this.addField(field2);

      //-- Control the notifications generated by 
      //-- the errors when processing the form
      this.resultAlert = null;
    }

    //-----------------------------------------------------------------------
    //-- Get the Information of the port(s): name, range, size...
    //-- and store it in the portInfo property
    //--
    //-- ERRORs are check and Notifications raised in case of errors
    //------------------------------------------------------------------------
    getPortInfo(names, evt) {

      let portInfo;
      let portInfos = [];

      //-- Check all the port names
      for (let name of names) {

        //-- Get the port Info: port name, size...
        portInfo = Form.parsePortName(name);

        //-- No portInfo... The was a syntax error
        if (!portInfo) {
          //-- Do not close the form
          evt.cancel = true;

          //-- Show a warning notification
          this.resultAlert = alertify.warning(
              gettextCatalog.getString('Wrong block name {{name}}', 
                                      { name: name }));
          return;
        }

        //-- TODO: Check sizes

        //-- Store the current portInfo
        if (portInfo.name !== '') {
          portInfos.push(portInfo);
        }
        
      }

      //-- Close the form when finish
      evt.cancel = false;

      return portInfos;

    }

    //-------------------------------------------------------
    //-- Analize the values introduce by the user and
    //-- store them as properties
    //-------------------------------------------------------
    parseFields() {

      //-- Read the values from the form
      this.values = this.readFields();

      //-- Values[0]: Input port names
      //-- Parse the input port names
      this.inPorts = Form.parseNames(this.values[0]);

      //-- Values[1]: Output port names
      //-- Parse the output port names
      this.outPorts = Form.parseNames(this.values[1]);

      //-- Values[2]: Input parameters
      //-- Parse the input parameters
      this.inParams = Form.parseNames(this.values[2]);
    }

    //------------------------------------------------
    //-- Process the information enter by the user
    //------------------------------------------------
    process(evt) {

      //-- If there was a previous notification, dismiss it
      if (this.resultAlert) {
        this.resultAlert.dismiss(false);
      }

      //-- Parse the Fields
      this.parseFields();

      //-- Get the ports info and check for errors
      this.inPortsInfo = this.getPortInfo(this.inPorts, evt);
      this.outPortsInfo = this.getPortInfo(this.outPorts, evt);
      this.inParamsInfo = this.getPortInfo(this.inParams, evt);
    }


  }
  
  
  
//--------------------------------------------------------------

  function basicPairedLabelForm() {

    //-- Create a blank Form
    let form = new Form();

    //-- Field 0: Text input
    let field0 = new TextField(
      gettextCatalog.getString('Enter the paired labels name'),
      '',   //-- Default value
      0     //-- Field id
    );

    //-- Field 1: Color dropdown
    let field1 = new ColorField(
      gettextCatalog.getString('Choose a color'),
      "fuchsia"
    );

    //-- Add the fields to the form
    form.addField(field0);
    form.addField(field1);

    //-- Return the form
    return form;
  }




  //-- Public classes
  this.Form = Form;
  this.TextField = TextField;
  this.CheckboxField = CheckboxField;
  
  this.basicPairedLabelForm = basicPairedLabelForm;

  this.FormBasicInput = FormBasicInput;
  this.FormBasicOutput = FormBasicOutput;
  this.FormBasicInputLabel = FormBasicInputLabel;
  this.FormBasicOutputLabel = FormBasicOutputLabel;
  this.FormBasicPairedLabels = FormBasicPairedLabels;
  this.FormBasicCode = FormBasicCode;




  //-----------------------------------------------------------
  //-- Create the html code for an input color dropdown field
  //-- INPUTS:
  //--   * label: Text message to shown as a title
  //--   * color: Color value
  //--   * colorName: Color name
  //--
  //-- Returns:
  //--   -A string with the HTML code for that Field
  //-----------------------------------------------------------
  this.htmlInputColor = function(label, color, colorName) {

    //-- Insert the parameters in the html code template
    let html = FORM_COLOR_INPUT_TEMPLATE.replace(
                  PARAM_LABEL,
                  label);

    html = html.replaceAll(PARAM_COLOR, color);
    html = html.replaceAll(PARAM_COLOR_NAME, colorName);

    return html;
  };


  //-----------------------------------------------------------
  //-- Create the html code for an input checkbox field
  //-- INPUTS:
  //--   * msg: Text message to shown as a title
  //--   * formID: Form identifier number
  //--
  //-- Returns:
  //--   -A string with the HTML code for that Field
  //-----------------------------------------------------------
  this.htmlInputCheckbox = function(label, value, formId) {

    //-- Insert the parameters in the html code template
    let html = FORM_CHECKBOX_TEMPLATE.replace(
                  PARAM_VALUE,
                  (value ? 'checked' : ''));

    html = html.replace(PARAM_ID, formId);
    html = html.replace(PARAM_LABEL, label);

    return html;
  };

  //-----------------------------------------------------------------------
  //-- Display a Form
  //-- Input: specs. Form specifications for rendering
  //--    * form: Form structure. It is an array of fields.They all have 
  //--       the property type: Which kind of information should be 
  //--         displayed. The field available are:
  //--          -Text, checkbox, combobox, color-dropdown
  //-- 
  //--    * callback(evt, values); The callback is executed when 
  //--          the users click on OK
  //-----------------------------------------------------------------------
  this.displayForm = function (form, callback) {

    //-- Variable for storing the html code of all the fields
    let formHtml = [];

    //-- Variable for storing temporal html code
    let html;

    //-- Initial tag for the Form
    formHtml.push('<div>');

    //-- Generate the html code for all the fields in the form
    for (let i in form) {
      var field = form[i];

      //-- Process all the form fields
      switch (field.type) {
        
        //-- Text input field
        case FIELD_TEXT:

          //-- TEMP CODE. REMOVE IT WHEN REFACTORED
          let f = new TextField(field.title, field.value, i);

          //-- Create the html code
          //-- label, value, formId
          html = f.html();
          //html = this.htmlInputText(field.title, field.value, i);

          //-- Store the html for this Form
          formHtml.push(html);
          break;

        //-- Checkbox input field
        case 'checkbox':

          //-- Create the html code for an input checkbox field
          html = this.htmlInputCheckbox(
            field.label, 
            field.value,
            i);

          //-- Store the html for this Field
          formHtml.push(html);
          break;

        //-- Combobox input field
        case 'combobox':

          //-- Create the html code for an input Combobox field
          html = this.htmlInputCombobox(
            field.options,
            field.label,
            field.value,
            i);
            
          //-- Store the html for this Field
          formHtml.push(html);
          break;

        //-- Color-Dropdown input Field
        case 'color-dropdown':
          

          //-- Set the default color if not previously defined
          field.color = field.color || "fuchsia";

          //-- Get the color with the first letter as capital
          let colorName = field.color.charAt(0).toUpperCase() + 
                          field.color.slice(1);

          //-- Create the html code for an input Color field
          html = this.htmlInputColor(
            field.label, 
            field.color,
            colorName);

          //-- Store the html for this Field
          formHtml.push(html);
          break;
      }
    }

    //-- Closing tag for the Form
    formHtml.push('</div>');

    //-- Generate a string with the HTML by joining
    //-- all the html of the fields
    formHtml = formHtml.join('');

    //-- Display the Form
    alertify.confirm(formHtml)

        //-- If the user has pressed the OK button...
      .set('onok', function (evt) {

        //-- Initialize the values for calling the
        //-- callback function
        let values = [];

        //-- Temporal variable for storing a field value
        let value;

        //-- If there is a callback function as argument
        if (callback) {

          //-- Read the values from the Form fields
          //-- and insert them into the values array
          for (let i in form) {

            let field = form[i];

            //-- Read the value depending on the field type
            switch (field.type) {

              //-- Input text and input combobox
              case 'text':
              case 'combobox':

                //-- Read the value from the form i
                value = $('#form' + i).val();

                //-- Add the value to the array
                values.push(value);
                break;

              //-- Input checkbox
              case 'checkbox':

                //-- Read the value from the form i
                value = $($('#form' + i).prop('checked'));
                value = value[0];

                //-- Add the value to the array
                values.push(value);
                break;

              //-- Input color dropdown menu
              case 'color-dropdown':

                //-- Read the value
                value = $('.lb-selected-color').data('color');

                //-- Add the value to the array
                values.push(value);
                break;
            }
          }
          //-- Now we can call the callback function passing
          //-- all the values as arguments
          callback(evt, values);
        }
      })

      //-- The button cancel is pressed:
      //--   Do nothing... 
      .set('oncancel', function ( /*evt*/) { });
  };


//---------------------------------------------------------------------------


  this.test = function() {
    console.log("holi...");
  };

  //this.getPins = getPins;

});