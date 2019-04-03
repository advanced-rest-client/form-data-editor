/**
@license
Copyright 2019 The Advanced REST client authors <arc@mulesoft.com>
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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {IronValidatableBehavior} from '../../@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {PayloadParserMixin} from '../../@advanced-rest-client/payload-parser-mixin/payload-parser-mixin.js';
import {ApiFormMixin} from '../../@api-components/api-form-mixin/api-form-mixin.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/iron-form/iron-form.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/paper-checkbox/paper-checkbox.js';
import '../../@api-components/api-form-mixin/api-form-styles.js';
import './form-data-editor-item.js';
/**
 * An element to edit form data (x-www-form-urlencoded).
 *
 * Empty values for both name and value inputs are not included in final body value.
 *
 * The element can work as a simple body creation element. Set `allow-custom`
 * to allow the user to add a parameter that hasn been predefined.
 *
 * ```html
 * <form-data-editor allow-custom></form-data-editor>
 * ```
 *
 * The element works with `advanced-rest-client/api-view-model-transformer`
 * that can create view model from default of from AMF json/ld model.
 * [AMF](https://github.com/mulesoft/amf) allows to transform RAML or OAS
 * specification of an API to a common model. The transformer generates
 * view model from api spec. If `allow-custom` is not set, the element
 * allows to define values only for properties defined in the model.
 *
 * ```html
 * <form-data-editor model="[...]"></form-data-editor>
 * ```
 *
 * The element allows to disable form item on the list so the user can
 * remove a property from the generated value without removing it from the
 * form. Use `allow-disable-params` to enable this feature.
 *
 * ```html
 * <form-data-editor allow-disable-params></form-data-editor>
 * ```
 *
 * ### Styling
 *
 * `<form-data-editor>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--form-data-editor` | Mixin applied to the element | `{}`
 * `--form-data-editor-encode-buttons` | Mixin applied to encode / decode buttons container | `{}`
 *
 * Properies included in `form-data-editor-item`:
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
 * @polymerBehavior Polymer.IronValidatableBehavior
 * @appliesMixin ApiFormMixin
 * @appliesMixin PayloadParserBehavior
 * @memberof UiElements
 */
class FormDataEditor extends
  mixinBehaviors([IronValidatableBehavior],
    ApiFormMixin(PayloadParserMixin(PolymerElement))) {
  static get template() {
    return html`
    <style include="api-form-styles">
    :host {
      display: block;
      @apply --form-data-editor;
    }

    .form-item-row {
      @apply --layout-horizontal;
      @apply --layout-start;
    }

    form-data-editor-item {
      @apply --layout-flex;
    }

    .option-pane {
      margin: 8px 0;
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --form-data-editor-encode-buttons;
    }

    .option-pane paper-checkbox {
      margin-left: 12px;
    }

    .enable-checkbox {
      margin-top: 32px;
      margin-right: 8px;
    }

    .form-item-row.is-custom .enable-checkbox {
      margin-top: 16px;
    }

    .form-item-row.is-narrow.is-custom paper-icon-button {
      margin-top: 16px;
    }

    .form-item-row.is-narrow.is-custom paper-checkbox {
      margin-top: 32px;
    }
    </style>
    <div class="option-pane">
      <paper-button title="Encodes payload to x-www-form-urlencoded data"
        on-click="_encodePaylod">Encode payload</paper-button>
      <paper-button title="Decodes payload to human readable form"
        on-click="_decodePaylod">Decode payload</paper-button>
      <template is="dom-if" if="[[renderOptionalCheckbox]]">
        <div class="optional-checkbox">
          <paper-checkbox class="toggle-checkbox" checked="{{optionalOpened}}"
            title="Shows or hides optional properties">Show optional properties</paper-checkbox>
        </div>
      </template>
    </div>
    <iron-form>
      <form enctype="application/json">
        <template is="dom-repeat" items="{{model}}">
          <div class\$="[[_computeItemClass(item, narrow, allowHideOptional, optionalOpened, allowDisableParams)]]"
            data-optional\$="[[computeIsOptional(hasOptional, item)]]">
            <template is="dom-if" if="[[allowDisableParams]]">
              <paper-checkbox class="enable-checkbox" checked="{{item.schema.enabled}}"
                title="Enable/disable this header"></paper-checkbox>
            </template>
            <form-data-editor-item narrow="[[narrow]]" name="{{item.name}}"
              value="{{item.value}}" model="[[item]]" required\$="[[item.required]]"
              is-custom="[[item.schema.isCustom]]" is-array="[[item.schema.isArray]]"
              no-label-float="" on-remove="_removeCustom"></form-data-editor-item>
          </div>
        </template>
      </form>
    </iron-form>
    <template is="dom-if" if="[[allowCustom]]">
      <div class="add-action">
        <paper-button class="action-button" on-click="add" title="Adds empty parameter to the form">
          <iron-icon class="action-icon" icon="arc:add-circle-outline" alt="Add parameter icon"></iron-icon>
          Add parameter
        </paper-button>
      </div>
    </template>
`;
  }

  static get is() {
    return 'form-data-editor';
  }
  static get properties() {
    return {
      value: {
        type: String,
        notify: true,
        observer: '_valueChanged'
      }
    };
  }

  static get observers() {
    return [
      '_modelChanged(model.*)'
    ];
  }
  /**
   * Appends an empty header to the list.
   */
  add() {
    if (!this.allowCustom) {
      return;
    }
    this.addCustom('query', {
      inputLabel: 'Parameter value'
    });
  }

  _modelChanged(record) {
    if (!record || !record.path) {
      return;
    }
    if (record.path === 'model.length') {
      return;
    }
    this._updateValue(record.base);
  }

  /** Encode payload button press handler */
  _encodePaylod() {
    this.encodeUrlEncoded(this.model);
    this.__postEncodeDecode();
  }

  /** Decode payload button press handler */
  _decodePaylod() {
    this.decodeUrlEncoded(this.model);
    this.__postEncodeDecode();
  }
  /**
   * Notifies paths about a change in the model's name/value properties.
   */
  __postEncodeDecode() {
    const model = this.model;
    if (!model) {
      return;
    }
    this.__internalChange = true;
    for (let i = 0, len = model.length; i < len; i++) {
      this.notifyPath(['model', i, 'name']);
      this.notifyPath(['model', i, 'value']);
    }
    this.__internalChange = false;
  }
  /**
   * Computes for item class.
   *
   * @param {Object} item Model for form item
   * @param {Boolean} narrow
   * @param {Boolean} allowHideOptional
   * @param {Boolean} optionalOpened
   * @param {Boolean} allowDisableParams
   * @return {String}
   */
  _computeItemClass(item, narrow, allowHideOptional, optionalOpened, allowDisableParams) {
    let cls = 'form-item form-item-row ';
    cls += this.computeFormRowClass(item, allowHideOptional, optionalOpened, allowDisableParams);
    if (item && item.schema.isCustom) {
      cls += ' is-custom';
    }
    if (narrow) {
      cls += ' is-narrow';
    }
    return cls;
  }
  /**
   * Updates the value when model changes.
   *
   * @param {Array} model Current model
   */
  _updateValue(model) {
    const hasModel = !!(model && model.length);
    const value = hasModel ? this.formArrayToString(model) : '';
    this.__internalChange = true;
    this.set('value', value);
    this.__internalChange = false;
  }
  /**
   * Updates the model from value, if not cause by internal setters.
   *
   * @param {String} value
   */
  _valueChanged(value) {
    if (this.__internalChange) {
      return;
    }
    this.model = undefined;
    const params = this.stringToArray(value);
    if (!params || !params.length) {
      return;
    }
    params.forEach((item) => this._paramToModel(item));
  }
  /**
   * Creates a model item from parser's name => value pairs.
   *
   * @param {Object} param Object with `value` and `name` properties.
   */
  _paramToModel(param) {
    const name = this.decodeQueryString(param.name);
    const value = this.decodeQueryString(param.value);
    this.addCustom('query', {
      inputLabel: 'Parameter value',
      name: name,
      value: value
    });
  }
}
window.customElements.define(FormDataEditor.is, FormDataEditor);
