/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Task priorities that determine the order in which tasks run.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Prioritized_Task_Scheduling_API#task_priorities)
 */
export type TaskPriority = 'user-blocking' | 'user-visible' | 'background';

/**
 * {@link Scheduler.postTask} options.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Scheduler/postTask#options)
 */
export type SchedulerPostTaskOptions = {
  /** The immutable {@link TaskPriority} of the task. One of `"user-blocking"`, `"user-visible"`, or `"background"`. If set, this priority is used for the lifetime of the task and priority set on the `signal` is ignored. */
  priority?: TaskPriority;
  /** An {@link AbortSignal} or {@link TaskSignal} that can be used to abort or re-prioritize the task (from its associated controller). The signal's priority is ignored if `priority` is set. */
  signal?: AbortSignal | TaskSignal;
  /** The minimum amount of time after which the task will be added to the scheduler queue, in whole milliseconds. The actual delay may be higher than specified, but will not be less. The default delay is 0. */
  delay?: number;
};

/**
 * {@link TaskController} options.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskController/TaskController#options)
 */
type TaskControllerOptions = {
  /** The {@link TaskPriority} of the signal associated with this {@link TaskController}. One of `"user-blocking"`, `"user-visible"`, or `"background"`. The default is `"user-visible"`. */
  priority?: TaskPriority;
}

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskPriorityChangeEvent/TaskPriorityChangeEvent#options) */
interface TaskPriorityChangeEventInit extends EventInit {
  /** A string indicating the previous priority of the task. One of `"user-blocking"`, `"user-visible"`, or `"background"`. */
  previousPriority: TaskPriority;
}

declare global {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Scheduler) */
  interface Scheduler {
    /**
     * Adds a task to the scheduler as a callback, optionally specifying a priority, delay, and/or a signal for aborting the task.
     * @param callback A callback function that implements the task. The return value of the callback is used to resolve the promise returned by this function.
     * @param options {@link SchedulerPostTaskOptions} options.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Scheduler/postTask)
     */
    postTask<T extends unknown>(callback: () => T, options?: SchedulerPostTaskOptions): Promise<T>;
    /**
     * Returns a promise that yields to the event loop when awaited, allowing continuation in a new task.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Scheduler/yield)
     */
    yield(): Promise<void>;
  }

  /**
   * A controller object that can be used to both abort and change the priority of one or more prioritized tasks.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskController)
   */
  class TaskController extends AbortController {
    constructor(options?: TaskControllerOptions);
    /** Returns a {@link TaskSignal} instance. The signal is passed to tasks so that they can be aborted or re-prioritized by the controller. */
    readonly signal: TaskSignal;
    /**
     * Sets the priority of the controller's signal, and hence the priority of any tasks with which it is associated.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskController/setPriority)
     */
    setPriority(priority: TaskPriority): void;
  }

  /**
   * The `prioritychange` event, sent to a {@link TaskSignal} if its priority is changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskPriorityChangeEvent)
   */
  class TaskPriorityChangeEvent extends Event {
    constructor(type: string, init: TaskPriorityChangeEventInit);
    /**
     * The priority of the corresponding {@link TaskSignal} _before_ this prioritychange event.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskPriorityChangeEvent/previousPriority)
     */
    readonly previousPriority: TaskPriority;
  }

  /**
   * A signal object that allows you to communicate with a prioritized task, aborting it or changing the priority (if required) via a {@link TaskController} object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskSignal)
   */
  class TaskSignal extends AbortSignal {
    /**
     * The priority of the signal.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskSignal/priority)
     */
    readonly priority: TaskPriority;
    /**
     * Fired when the priority is changed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TaskSignal/prioritychange_event)
     */
    onprioritychange: (event: TaskPriorityChangeEvent) => void;
  }

  /**
   * The global {@link Scheduler} entry point for using the Prioritized Task Scheduling API.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scheduler)
   */
  const scheduler: Scheduler;
}
