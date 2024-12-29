import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ExportStatusButton } from './status.button1.component';
import { ProjectsService } from '../../projects/services/projects.service';

describe('ExportStatusButton', () => {
  let component: ExportStatusButton;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
        { provide: ProjectsService, useValue: {} },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExportStatusButton);
    component = fixture.componentInstance;
  });

  it('should log "exportFlagCallback function is not defined" if exportFlagCallback is not a function', () => {
    component['statusBarSettings'] = {};
    const consoleSpy = jest.spyOn(console, 'log');
    component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlagCallback function is not defined'
    );
  });

  it('should log "exportFlagCallback function is defined" and call exportGridData if exportFlagCallback resolves to true', async () => {
    const mockCallback = jest.fn().mockResolvedValue(true);
    component['statusBarSettings'] = { exportFlagCallback: mockCallback };
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest.spyOn(component, 'exportGridData');
    await component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlagCallback function is defined'
    );
    expect(exportSpy).toHaveBeenCalled();
  });

  it('should log "exportFlagCallback function is defined" and not call exportGridData if exportFlagCallback resolves to false', async () => {
    const mockCallback = jest.fn().mockResolvedValue(false);
    component['statusBarSettings'] = { exportFlagCallback: mockCallback };
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest.spyOn(component, 'exportGridData');
    await component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlagCallback function is defined'
    );
    expect(exportSpy).not.toHaveBeenCalled();
  });

  it('should log "exportFlag is true" and call exportGridData if exportFlag is true', () => {
    component['statusBarSettings'] = { exportFlag: true };
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest.spyOn(component, 'exportGridData');
    component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith('exportFlag is true');
    expect(exportSpy).toHaveBeenCalled();
  });

  it('should log "exportFlag is defined and not true" if exportFlag is false', () => {
    component['statusBarSettings'] = { exportFlag: false };
    const consoleSpy = jest.spyOn(console, 'log');
    component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlag is defined and not true'
    );
  });

  it('should log "No export flag defined" and call exportGridData if no export flag is defined', () => {
    component['statusBarSettings'] = {};
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest.spyOn(component, 'exportGridData');
    component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith('No export flag defined');
    expect(exportSpy).toHaveBeenCalled();
  });
});
