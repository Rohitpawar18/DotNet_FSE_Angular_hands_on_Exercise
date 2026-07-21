import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component) => {
  if (component.canDeactivate()) {
    return true; // Component OK with navigation
  }

  const result = window.confirm('You have unsaved changes. Are you sure you want to leave?');

  console.log(
    result
      ? '✅ User confirmed leaving with unsaved changes'
      : '❌ User cancelled - staying on page',
  );

  return result;
};
