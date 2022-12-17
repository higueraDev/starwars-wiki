import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnChanges {
  @Input() source: string = '';
  private audio: HTMLAudioElement = new Audio();
  public audioEnabled: boolean = false;

  ngOnChanges() {
    this.audio.src = this.source;
    this.audio.load();
  }

  onClick() {
    this.toggleSound();
    this.handleAudio();
  }

  toggleSound() {
    this.audioEnabled = !this.audioEnabled;
  }

  handleAudio() {
    if (this.audioEnabled) this.audio.play();
    else this.audio.pause()
  }
}
