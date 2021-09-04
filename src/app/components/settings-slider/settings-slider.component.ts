import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-slider',
  templateUrl: './settings-slider.component.html',
  styleUrls: ['./settings-slider.component.sass']
})
export class SettingsSliderComponent implements OnInit {

  @Input() autoTicks = false;
  @Input() disabled = false;
  @Input() invert = false;
  @Input() max = 100;
  @Input() min = 0;
  @Input() showTicks = false;
  @Input() step = 1;
  @Input() thumbLabel = false;
  @Input() value = 0;
  @Input() vertical = false;
  @Input() tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
