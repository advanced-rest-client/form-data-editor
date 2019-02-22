/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';

import '../../@polymer/polymer/lib/elements/dom-if.js';
import '../../arc-icons/arc-icons.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/iron-collapse/iron-collapse.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/marked-element/marked-element.js';
import '../../markdown-styles/markdown-styles.js';
import '../../api-form-mixin/api-form-styles.js';
import '../../api-property-form-item/api-property-form-item.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="form-data-editor-item">
  <template strip-whitespace="">
    <style include="api-form-styles"></style>
    <style include="markdown-styles"></style>
    <style>
    :host {
      display: block;
      @apply --form-data-editor-item;
    }

    .custom-inputs,
    .value-field {
      @apply --layout-horizontal;
      @apply --layout-start;
    }

    .narrow .custom-inputs {
      display: block;
    }

    .name-field,
    .value-field,
    .param-name,
    .custom-inputs,
    api-property-form-item {
      @apply --layout-flex;
    }

    api-property-form-item[is-array] {
      margin-top: 8px;
    }

    .param-name {
      margin-right: 12px;
      @apply --api-form-name-input;
    }

    .narrow .param-name {
      margin-right: 0;
      @apply --api-form-name-input-narrow;
    }

    [hidden] {
      display: none !important;
    }

    .hint-icon {
      margin-top: 16px;
    }

    .form-item.narrow {
      @apply --layout-horizontal;
    }

    .form-item.narrow .delete-icon {
      margin-top: 16px;
    }
    </style>
    <div class\$="form-item [[_computeNarrowClass(narrow)]]">
      <template is="dom-if" if="[[!isCustom]]">
        <div class="value-field">
          <api-property-form-item model="[[model]]" name="[[name]]" value="{{value}}" data-type="typed" required\$="[[required]]"></api-property-form-item>
          <template is="dom-if" if="[[model.hasDescription]]">
            <paper-icon-button class="hint-icon" title="Display documentation" icon="arc:help" on-tap="toggleDocumentation"></paper-icon-button>
          </template>
        </div>
      </template>
      <template is="dom-if" if="[[isCustom]]">
        <div class="custom-inputs">
          <div class="name-field">
            <paper-input value="{{name}}" label="Parameter name" class="param-name" no-label-float="[[noLabelFloat]]" required="" auto-validate=""></paper-input>
          </div>
          <div class="value-field">
            <api-property-form-item model="[[model]]" name="[[name]]" value="{{value}}" data-type="custom" required\$="[[required]]" no-label-float="[[noLabelFloat]]"></api-property-form-item>
          </div>
        </div>
        <paper-icon-button title="Remove parameter" class="action-icon delete-icon" icon="arc:remove-circle-outline" on-tap="_remove"></paper-icon-button>
      </template>
    </div>
    <template is="dom-if" if="[[model.hasDescription]]" restamp="">
      <div class="docs">
        <iron-collapse opened="[[docsOpened]]">
          <marked-element markdown="[[model.description]]">
            <div slot="markdown-html" class="markdown-body"></div>
          </marked-element>
        </iron-collapse>
      </div>
    </template>
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * An element that renders form controls for the editor.
 *
 * ### Styling
 *
 * `<form-data-editor-item>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--form-data-editor-item` | Mixin applied to the element | `{}`
 * `--api-form-name-input` | Mixin applied to custom item name input field | `{}`
 * `--api-form-name-input-narrow` | Mixin applied to custom item name input field when narrow | `{}`
 *
 * Properies inheritet from `api-form-styles`
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--api-form-row` | Mixin applied to API form rows. Each row already applies `--layout-horizontal` and `--layout-start` | `{}`
 * `--api-form-row-narrow` | Mixin applied to API form rows when `narrow` property is set | `{}`
 * `--api-form-row-optional` | Mixin applied to optional row of the form (not required). By default this form row is hidden from the view | `{}`
 * `--api-form-row-optional-visible` | Mixin applied to optional row of the form when it becomes visible | `{}`
 * `--api-form-action-button-color` | Color of the action button in the form. Action buttons should perform form's primary actions like "submit" or "add new". Use `--api-form-action-icon-*` for icons related styling | `--secondary-button-color` or `--accent-color`
 * `--api-form-action-button-background-color` | Similar to `--api-form-action-button-color` but it's background color | `--secondary-button-background`
 * `--secondary-button` | Mixin applied to the action button. This is more general theme element. This values can be overriten by `--api-form-action-button` | `{}`
 * `--api-form-action-button` | Mixin applied to the action button | `{}`
 * `--api-form-action-button-hover-color` | Color of the action button in the form when hovering. | `--secondary-button-color` or `--accent-color`
 * `--api-form-action-button-hover-background-color` | Similar to `--api-form-action-button-hover-color` but it's background color | `--secondary-button-background`
 * `--secondary-button-hover` | Mixin applied to the action button when hovered. This is more general theme element. This values can be overriten by `--api-form-action-button` | `{}`
 * `--api-form-action-button-hover` | Mixin applied to the action button when hovered. | `{}`
 * `--hint-trigger-color` | Color of the form action icon button to dispay documentation for the item. | `rgba(0, 0, 0, 0.74)`
 * `--icon-button` | Mixin applied to the icon button to dispay documentation for the item | `{}`
 * `--hint-trigger-hover-color` | Color of the form action icon button to dispay documentation for the item when hovered | `rgba(0, 0, 0, 0.74)`
 * `--icon-button-hover` | Mixin applied to the icon button to dispay documentation for the item when hovered | `{}`
 * `--api-form-action-icon-color` | Color of any other than documentation icon button in form row | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
 * `--api-form-action-icon-hover-color` | Color of any other than documentation icon button in form row when hovering | `--accent-color` or `rgba(0, 0, 0, 0.88)`
 * `--inline-documentation-background-color` | Background color of the documentation element. | `#FFF3E0`
 * `--inline-documentation-color` | Color of the documentation element | `rgba(0, 0, 0, 0.87)`
 * `--inline-documentation-font-size` | Font size of the documentaiton element | `13px`
 *
 * @customElement
 * @polymer
 * @demo demo/simple.html Simple usage
 * @demo demo/raml.html With AMF model from RAML file
 */
class FormDataEditorItem extends PolymerElement {
  static get is() { return 'form-data-editor-item'; }
  static get properties() {
    return {
      /**
       * The name of this element.
       */
      name: {
        notify: true,
        type: String
      },
      /**
       * The value of this element.
       */
      value: {
        notify: true,
        type: String
      },
      /**
       * A model item
       */
      model: Object,
      /**
       * If set it renders a narrow layout
       */
      narrow: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * True to render documentation (if set in model)
       */
      docsOpened: Boolean,
      /**
       * Computed value passed to the inputs.
       * If true then floating labels are not displayed.
       * Floating labels are visible only for narrow layout.
       */
      noLabelFloat: {
        type: Boolean,
        value: true,
        computed: '_computeNoLabelFloat(narrow)'
      },
      /**
       * Set if the header is not specified in the RAML type (is a custom
       * header).
       */
      isCustom: {
        type: Boolean,
        value: false
      },
      /**
       * If set it is render the item control as an array item (adds more
       * spacing to the element)
       */
      isArray: {
        type: Boolean,
        reflectToAttribute: true
      },
      // True when this model is required
      required: Boolean
    };
  }
  // Computes css class name for narrow layout
  _computeNarrowClass(narrow) {
    return narrow ? 'narrow' : undefined;
  }
  // Computes `noLabelFloat` property
  _computeNoLabelFloat(narrow) {
    return !narrow;
  }
  // Toggles documentation (if available)
  toggleDocumentation() {
    this.docsOpened = !this.docsOpened;
  }
  /**
   * Dispatches `remove` custom event that does not bubbles to inform the editor
   * to delete this parameter.
   */
  _remove() {
    this.dispatchEvent(new CustomEvent('remove', {
      bubbles: false
    }));
  }
}
window.customElements.define(FormDataEditorItem.is, FormDataEditorItem);
