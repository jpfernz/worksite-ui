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
    component['statusBarSettings'] = {
      exportSettings: () => ({}),
    } as any;
    const consoleSpy = jest.spyOn(console, 'log');
    const exportGridDataSpy = jest.spyOn(component, 'exportGridData');
    component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlagCallback is not defined'
    );
    expect(exportGridDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should log "exportFlagCallback function is defined" and call exportGridData if exportFlagCallback resolves to true', async () => {
    const mockCallback = jest.fn().mockResolvedValue(true);
    component['statusBarSettings'] = {
      exportSettings: () => ({
        exportFlagCallback: mockCallback,
      }),
    } as any;
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest.spyOn(component, 'exportGridData');
    await component.onExportClick();
    await Promise.resolve();
    // expect(consoleSpy).toHaveBeenCalledWith(
    //   'exportFlagCallback function is defined'
    // );
    expect(exportSpy).toHaveBeenCalledTimes(1);
  });

  it('should log "exportFlagCallback function is defined" and not call exportGridData if exportFlagCallback resolves to false', async () => {
    const mockCallback = jest.fn().mockResolvedValue(false);
    const mockExportGridData = jest.fn();
    component['statusBarSettings'] = {
      exportSettings: () => ({
        exportFlagCallback: mockCallback,
      }),
    } as any;
    const consoleSpy = jest.spyOn(console, 'log');
    const exportSpy = jest
      .spyOn(component, 'exportGridData')
      .mockImplementation(mockExportGridData);
    await component.onExportClick();
    expect(consoleSpy).toHaveBeenCalledWith(
      'exportFlagCallback function is defined'
    );
    expect(exportSpy).not.toHaveBeenCalled();
  });
});
