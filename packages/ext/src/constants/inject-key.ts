
/**
 * used in 
 * ```html
 * <Select>
 *   ...
 *  <SelectValue>
 *    <InjectWrapper :inject-key="IS_SELECTED_KEY" :inject-value="...">
 *      <YourComonpent/ >
 *    </InjectWrapper>
 *  </SelectValue>
 *   ...
 * </Select>
 * ```
 * Your Component will behave different of <select>/<not select> based on a inject value
 * 
 */
export const IS_SELECTED_KEY='COMPONENT_IS_SELECT'


export const USER_CUSTOM_CSS_VAR_PREFIX='--webpage-summary-user-'