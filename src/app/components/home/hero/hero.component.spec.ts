import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';
import { AppModule } from '../../../app.module';
import { StoreService } from '../../../services/store.service';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ignores touch hover and activates only after a tap', async () => {
    vi.useFakeTimers();
    const speed = vi.spyOn(TestBed.inject(StoreService), 'setStarSpeed');
    const scroll = vi.spyOn(component.scrollToCatalog, 'emit');
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'touch' }));
    expect(speed).not.toHaveBeenCalled();
    expect(component.brandActive).toBe(false);
    button.click();
    expect(component.brandActive).toBe(true);
    expect(speed).toHaveBeenCalledWith(8.5);
    expect(scroll).toHaveBeenCalledTimes(1);
    button.dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'touch' }));
    await vi.advanceTimersByTimeAsync(900);
    expect(component.brandActive).toBe(false);
    expect(speed).toHaveBeenCalledWith(1);
    vi.useRealTimers();
  });

  it('preserves mouse hover on hover-capable devices', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    component.onBrandHover(new PointerEvent('pointerenter', { pointerType: 'mouse' }), true);
    expect(component.brandActive).toBe(true);
    component.onBrandHover(new PointerEvent('pointerleave', { pointerType: 'mouse' }), false);
    expect(component.brandActive).toBe(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
