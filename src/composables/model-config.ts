// management of model config items

import { storage } from "#imports";
import { DEFAULT_MODEL_ID_KEY, MODEL_CONFIG_KEY } from "../constants/storage-key";
import { ModelConfigItem } from "../types/config/model"; // Assuming this type exists
import { uid } from "radash";
import useWxtStorage from "./useWxtStorage";

/**
 * return reactive model config items using WxtStorage.
 *
 * This hook provides the state, error, loading status, and readiness status
 * of the model configurations stored in WxtStorage.
 *
 * @return  `state`: The current state of the model configurations.
 * @return `error`: Any error encountered while loading the model configurations.
 * @return `isLoading`: A boolean indicating if the model configurations are currently being loaded.
 * @return `isReady`: A boolean indicating if the model configurations are ready to be used.
 */
export function useModelConfigs() {
  const { state, error, isLoading, isReady } = useWxtStorage<ModelConfigItem[]>(MODEL_CONFIG_KEY, []);
  return { state, error, isLoading, isReady };
}

/**
 * Manages model configuration items in storage.
 */
export function useModelConfigStorage() {
  // Define storage items for model configurations and the default model item ID.
  const modelStorage = storage.defineItem<ModelConfigItem[]>(MODEL_CONFIG_KEY, { fallback: [] });
  const defaultModelItemIdStorage = storage.defineItem<string | null>(DEFAULT_MODEL_ID_KEY, { fallback: null });

  /**
   * Checks if a model configuration with the given name in the storage.
   * @param name The name of the model configuration to check.
   * @returns A boolean indicating whether a model configuration with the given name and providerType exists.
   */
  async function isNameExist(name: string): Promise<boolean> {
    // Retrieve the current model configurations from storage
    const models = await modelStorage.getValue();

    // Check if any of the models have the provided name and providerType
    return models.some(model => model.name === name);
  }


  /**
   * Finds a model configuration item by its name.
   *
   * @param name - The name of the model configuration to find.
   * @returns A promise that resolves to the model configuration item if found, or undefined if not found.
   */
  async function findByName(name: string): Promise<ModelConfigItem | undefined> {
    // Retrieve the current model configurations from storage
    const models = await modelStorage.getValue();

    // Check if any of the models have the provided name and providerType
    return models.find(model => model.name === name);
  }
  /**
   * Creates a new model configuration item.
   * @param configItem The model configuration item to create.
   * @returns True if the item was created successfully, false otherwise.
   */
  async function createItem(configItem: ModelConfigItem) {
    // Get the current models from storage.
    const models = await modelStorage.getValue();
    // If a model with the same name and providerType already exists, add a number to the name.
    while (await isNameExist(configItem.name)) {
      configItem.name = configItem.name + '(1)';
    }
    // Generate a unique ID for the model configuration item.
    configItem.id = uid(16);
    // Add the new model configuration item to the list.
    models.push(configItem);
    // If this is the first model, set it as the default.
    if (models.length === 1) {
      defaultModelItemIdStorage.setValue(configItem.id);
    }
    //write back
    modelStorage.setValue(models);
    return true;
  }

  /**
   * Updates an existing model configuration item.
   * @param configItem The model configuration item to update.
   * @returns True if the item was updated successfully, false otherwise.
   */
  async function updateItem(configItem: ModelConfigItem) {
    // Get the current models from storage.
    const models = await modelStorage.getValue();
    // Find the index of the model configuration item to update.
    const index = models.findIndex(p => p.id === configItem.id);

    // If the model configuration item was not found, return false.
    if (index === -1) {
      return { isSuc: false, msg: `item record not found` };
    }


    // If a model with the same name and providerType already exists, return false.
    const sameNameOne = await findByName(configItem.name)
    if (sameNameOne && sameNameOne.id !== configItem.id) {
      return { isSuc: false, msg: `name:<${configItem.name}> already exists` };
    }
    // Update the model configuration item in the list.
    models[index] = configItem;
    //write back
    modelStorage.setValue(models);
    return { isSuc: true, msg: `success!` };
  }

  /**
   * Lists all model configuration items.
   * @returns A list of all model configuration items.
   */
  async function listItem() {
    return await modelStorage.getValue();
  }

  /**
   * Deletes a model configuration item.
   * @param id The ID of the model configuration item to delete.
   * @returns True if the item was deleted successfully, false otherwise.
   */
  async function deleteItem(id: string) {
    // Get the current models from storage.
    const models = await modelStorage.getValue();
    // Find the index of the model configuration item to delete.
    const index = models.findIndex(p => p.id === id);
    // If the model configuration item was not found, return false.
    if (index === -1) {
      return false;
    }
    models.splice(index, 1);
    // If there are no more models, set the default model item ID to null.
    if (models.length === 0) {
      defaultModelItemIdStorage.setValue(null);
    }
    // write back
    modelStorage.setValue(models);
    return true;
  }

  /**
   * Updates the order of a model configuration item in the list.
   * @param id The ID of the model configuration item to update.
   * @param direction The direction to move the item in ('up' or 'down').
   * @returns True if the item was moved successfully, false otherwise.
   */
  async function updateConfigOrder(id: string, direction: 'up' | 'down') {
    // Get the current models from storage.
    const models = await modelStorage.getValue();
    // Find the index of the model configuration item to update.
    const index = models.findIndex(p => p.id === id);
    // If the model configuration item was not found, return false.
    if (index === -1) return false;
    // If the item is already at the top or bottom of the list, return false.
    if (direction === 'up' && index === 0) return false;
    if (direction === 'down' && index === models.length - 1) return false;
    // Calculate the index of the item to exchange with.
    let exchangeIndex = direction === 'up' ? index - 1 : index + 1;
    // Exchange the items in the list.
    const temp = models[index];
    models[index] = models[exchangeIndex];
    models[exchangeIndex] = temp;


    // write back
    modelStorage.setValue(models);
    return true;
  }

  /**
   * Sets the default model configuration item ID.
   * @param id The ID of the model configuration item to set as the default.
   * @returns True if the default model configuration item ID was set successfully, false otherwise.
   */
  async function setDefaultItemId(id: string) {
    // Get the current models from storage.
    const models = await modelStorage.getValue();
    // Find the index of the model configuration item to set as the default.
    const index = models.findIndex(p => p.id === id);
    // If the model configuration item was not found, return false.
    if (index === -1) return false;
    // Set the default model configuration item ID.
    defaultModelItemIdStorage.setValue(id);
    return true;
  }


  async function getDefaultItem() {
    const defaultId = await defaultModelItemIdStorage.getValue();
    if (!defaultId) {
      return null;
    }
    return getItem(defaultId)
  }

  async function getItem(id: string) {
    const models = await modelStorage.getValue();
    return models.find(p => p.id === id);
  }
  // Return the functions to manage model configuration items.
  return {
    isNameExist, findByName,
    getItem, createItem, updateItem, listItem, deleteItem, updateConfigOrder, setDefaultItemId, getDefaultItem
  }
}