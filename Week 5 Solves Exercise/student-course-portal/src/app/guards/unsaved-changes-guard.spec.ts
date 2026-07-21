import { TestBed } from '@angular/core/testing';
import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(unsavedChangesGuard).toBeTruthy();
  });
});
